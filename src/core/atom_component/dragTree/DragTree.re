type state = {style: ReactDOMRe.Style.t};

type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragGameObject(int, int)
  | DragWdb(int);

module Method = {
  let handleDragEnter =
      (
        id,
        (handleWidgeFunc, handleRelationErrorFunc, isAssetWdbFile),
        _event,
      ) =>
    DragEventBaseUtils.isTriggerDragEnter(
      id,
      handleWidgeFunc,
      handleRelationErrorFunc,
    )
    || isAssetWdbFile() ?
      DragEnter : Nothing;

  let handleDragLeave =
      (id, (handleWidgeFunc, handleRelationErrorFunc, isAssetWdbFile), event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);

    DragEventBaseUtils.isTriggerDragLeave(
      id,
      handleWidgeFunc,
      handleRelationErrorFunc,
    )
    || isAssetWdbFile() ?
      DragLeave : Nothing;
  };

  let handleDrop =
      (
        rootUid,
        (handleWidgeFunc, handleRelationErrorFunc, isAssetWdbFile),
        event,
      ) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedUid(e);

    DragEventBaseUtils.isTriggerDragDrop(
      rootUid,
      startId,
      handleWidgeFunc,
      handleRelationErrorFunc,
    ) ?
      DragGameObject(rootUid, startId) :
      isAssetWdbFile() ?
        {
          let wdbGameObjectUid =
            StateEditorService.getState()
            |> AssetWdbNodeMapEditorService.getWdbNodeMap
            |> WonderCommonlib.SparseMapService.unsafeGet(startId)
            |> (({wdbGameObject}) => wdbGameObject);

          DragWdb(wdbGameObjectUid);
        } :
        DragLeave;
  };
};

let component = ReasonReact.reducerComponent("DragTree");

let reducer = (dragGameObject, dragWdb, action, state) =>
  switch (action) {
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("backgroundColor", "yellow", state.style),
    })

  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("backgroundColor", "#c0c0c0", state.style),
    })

  | DragGameObject(rootUid, removedId) =>
    ReasonReactUtils.sideEffects(() => dragGameObject((rootUid, removedId)))

  | DragWdb(wdbGameObjectUid) =>
    ReasonReactUtils.sideEffects(() => dragWdb(wdbGameObjectUid))

  | Nothing => ReasonReact.NoUpdate
  };

let render =
    (
      treeArray,
      rootUid,
      (handleWidgeFunc, handleRelationErrorFunc, isAssetWdbFile),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-drag-tree">
    (ReasonReact.arrayToElement(treeArray))
    <div
      style=state.style
      className="wonder-disable-drag"
      onDragEnter=(
        _e =>
          send(
            Method.handleDragEnter(
              rootUid,
              (handleWidgeFunc, handleRelationErrorFunc, isAssetWdbFile),
              _e,
            ),
          )
      )
      onDragLeave=(
        _e =>
          send(
            Method.handleDragLeave(
              rootUid,
              (handleWidgeFunc, handleRelationErrorFunc, isAssetWdbFile),
              _e,
            ),
          )
      )
      onDragOver=DragEventUtils.handleDragOver
      onDrop=(
        _e =>
          send(
            Method.handleDrop(
              rootUid,
              (handleWidgeFunc, handleRelationErrorFunc, isAssetWdbFile),
              _e,
            ),
          )
      )
    />
  </article>;

let make =
    (
      ~treeArray,
      ~rootUid,
      ~dragGameObject,
      ~dragWdb,
      ~isWidge,
      ~handleRelationError,
      ~isAssetWdbFile,
      _children,
    ) => {
  ...component,
  initialState: () => {
    style: ReactDOMRe.Style.make(~backgroundColor="#c0c0c0", ()),
  },
  reducer: reducer(dragGameObject, dragWdb),
  render: self =>
    render(
      treeArray,
      rootUid,
      (isWidge, handleRelationError, isAssetWdbFile),
      self,
    ),
};