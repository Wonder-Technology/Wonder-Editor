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
        (handleWidgetFunc, handleRelationErrorFunc, isAssetWDBFile),
        _event,
      ) =>
    DragEventBaseUtils.isTriggerDragEnter(
      id,
      handleWidgetFunc,
      handleRelationErrorFunc,
    )
    || isAssetWDBFile() ?
      DragEnter : Nothing;

  let handleDragLeave =
      (id, (handleWidgetFunc, handleRelationErrorFunc, isAssetWDBFile), event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);

    DragEventBaseUtils.isTriggerDragLeave(
      id,
      handleWidgetFunc,
      handleRelationErrorFunc,
    )
    || isAssetWDBFile() ?
      DragLeave : Nothing;
  };

  let handleDrop =
      (
        rootUid,
        (handleWidgetFunc, handleRelationErrorFunc, isAssetWDBFile),
        event,
      ) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedUid(e);

    DragEventBaseUtils.isTriggerDragDrop(
      rootUid,
      startId,
      handleWidgetFunc,
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

  | DragWDB(wdbGameObjectUid) =>
    ReasonReactUtils.sideEffects(() => dragWDB(wdbGameObjectUid))

  | Nothing => ReasonReact.NoUpdate
  };

let render =
    (
      treeArray,
      rootUid,
      (handleWidgetFunc, handleRelationErrorFunc, isAssetWDBFile),
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
              (handleWidgetFunc, handleRelationErrorFunc, isAssetWDBFile),
              _e,
            ),
          )
      )
      onDragLeave=(
        _e =>
          send(
            Method.handleDragLeave(
              rootUid,
              (handleWidgetFunc, handleRelationErrorFunc, isAssetWDBFile),
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
              (handleWidgetFunc, handleRelationErrorFunc, isAssetWDBFile),
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
      ~isWidget,
      ~handleRelationError,
      ~isAssetWDBFile,
      _children,
    ) => {
  ...component,
  initialState: () => {
    style: ReactDOMRe.Style.make(~backgroundColor="#c0c0c0", ()),
  },
  reducer: reducer(dragGameObject, dragWDB),
  render: self =>
    render(
      treeArray,
      rootUid,
      (isWidget, handleRelationError, isAssetWDBFile),
      self,
    ),
};