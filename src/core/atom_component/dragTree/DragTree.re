type state = {style: ReactDOMRe.Style.t};

type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragGameObject(int, int)
  | DragWDB(int);

module Method = {
  let handleDragEnter =
      (
        id,
        (handleWidgeFunc, handleRelationErrorFunc, isAssetWDBFile),
        _event,
      ) =>
    DragEventBaseUtils.isTriggerDragEnter(
      id,
      handleWidgeFunc,
      handleRelationErrorFunc,
    )
    || isAssetWDBFile() ?
      DragEnter : Nothing;

  let handleDragLeave =
      (id, (handleWidgeFunc, handleRelationErrorFunc, isAssetWDBFile), event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);

    DragEventBaseUtils.isTriggerDragLeave(
      id,
      handleWidgeFunc,
      handleRelationErrorFunc,
    )
    || isAssetWDBFile() ?
      DragLeave : Nothing;
  };

  let handleDrop =
      (
        rootUid,
        (handleWidgeFunc, handleRelationErrorFunc, isAssetWDBFile),
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
      isAssetWDBFile() ?
        {
          let wdbGameObjectUid =
            StateEditorService.getState()
            |> AssetWDBNodeMapEditorService.getWDBNodeMap
            |> WonderCommonlib.SparseMapService.unsafeGet(startId)
            |> (({wdbGameObject}) => wdbGameObject);

          DragWDB(wdbGameObjectUid);
        } :
        DragLeave;
  };
};

let component = ReasonReact.reducerComponent("DragTree");

let reducer = (dragGameObject, dragWDB, action, state) =>
  switch (action) {
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("backgroundColor", "black", state.style),
    })

  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("backgroundColor", "#474747", state.style),
    })

  | DragGameObject(rootUid, removedId) =>
    ReasonReactUtils.sideEffects(() => dragGameObject((rootUid, removedId)))

  | DragWDB(wdbGameObjectUid) =>
    ReasonReactUtils.sideEffects(() => dragWDB(wdbGameObjectUid))

  | Nothing => ReasonReact.NoUpdate
  };

let render =
    (
      treeArray,
      rootUid,
      (handleWidgeFunc, handleRelationErrorFunc, isAssetWDBFile),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-drag-tree">
    (ReasonReact.array(treeArray))
    <div
      style=state.style
      className="wonder-disable-drag"
      onDragEnter=(
        _e =>
          send(
            Method.handleDragEnter(
              rootUid,
              (handleWidgeFunc, handleRelationErrorFunc, isAssetWDBFile),
              _e,
            ),
          )
      )
      onDragLeave=(
        _e =>
          send(
            Method.handleDragLeave(
              rootUid,
              (handleWidgeFunc, handleRelationErrorFunc, isAssetWDBFile),
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
              (handleWidgeFunc, handleRelationErrorFunc, isAssetWDBFile),
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
      ~dragWDB,
      ~isWidge,
      ~handleRelationError,
      ~isAssetWDBFile,
      _children,
    ) => {
  ...component,
  initialState: () => {
    style: ReactDOMRe.Style.make(~backgroundColor="#474747", ()),
  },
  reducer: reducer(dragGameObject, dragWDB),
  render: self =>
    render(
      treeArray,
      rootUid,
      (isWidge, handleRelationError, isAssetWDBFile),
      self,
    ),
};