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
        (isWidgetFunc, handleRelationErrorFunc, isWDBAssetFileFunc),
        _event,
      ) =>
    DragEventBaseUtils.isTriggerDragEnter(
      id,
      isWidgetFunc,
      handleRelationErrorFunc,
    )
    || isWDBAssetFileFunc() ?
      DragEnter : Nothing;

  let handleDragLeave =
      (
        id,
        (isWidgetFunc, handleRelationErrorFunc, isWDBAssetFileFunc),
        event,
      ) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    /* DomHelper.stopPropagation(e); */

    DragLeave;
  };

  let handleDragOver =
      (
        rootUid,
        (isWidgetFunc, handleRelationErrorFunc, isWDBAssetFileFunc),
        event,
      ) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedId(e);

    DragEventBaseUtils.isTriggerDragDrop(
      rootUid,
      startId,
      isWidgetFunc,
      handleRelationErrorFunc,
    ) ?
      DragEventUtils.handleDragOver("move", event) :
      isWDBAssetFileFunc() ? DragEventUtils.handleDragOver("copy", event) : ();
  };

  let handleDrop =
      (
        rootUid,
        (isWidgetFunc, handleRelationErrorFunc, isWDBAssetFileFunc),
        event,
      ) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedId(e);

    DragEventBaseUtils.isTriggerDragDrop(
      rootUid,
      startId,
      isWidgetFunc,
      handleRelationErrorFunc,
    ) ?
      DragGameObject(rootUid, startId) :
      isWDBAssetFileFunc() ?
        {
          let wdbGameObjectUid =
            StateEditorService.getState()
            |> WDBNodeMapAssetEditorService.getWDBNodeMap
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
        ReactUtils.addStyleProp("backgroundColor", "#333333", state.style),
    })

  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("backgroundColor", "#666666", state.style),
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
      (isWidgetFunc, handleRelationErrorFunc, isWDBAssetFileFunc),
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
              (isWidgetFunc, handleRelationErrorFunc, isWDBAssetFileFunc),
              _e,
            ),
          )
      )
      onDragLeave=(
        _e =>
          send(
            Method.handleDragLeave(
              rootUid,
              (isWidgetFunc, handleRelationErrorFunc, isWDBAssetFileFunc),
              _e,
            ),
          )
      )
      onDragOver=(
        _e =>
          Method.handleDragOver(
            rootUid,
            (isWidgetFunc, handleRelationErrorFunc, isWDBAssetFileFunc),
            _e,
          )
      )
      onDrop=(
        _e =>
          send(
            Method.handleDrop(
              rootUid,
              (isWidgetFunc, handleRelationErrorFunc, isWDBAssetFileFunc),
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
      ~isWDBAssetFile,
      _children,
    ) => {
  ...component,
  initialState: () => {
    style: ReactDOMRe.Style.make(~backgroundColor="#666666", ()),
  },
  reducer: reducer(dragGameObject, dragWDB),
  render: self =>
    render(
      treeArray,
      rootUid,
      (isWidget, handleRelationError, isWDBAssetFile),
      self,
    ),
};