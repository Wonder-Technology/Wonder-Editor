type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragEnd
  | DragStart
  | DragDrop(int, int);

let handleDragStart = (id, widge, dragImg, event) => {
  DragEventBaseUtils.dragStart(id, widge, dragImg, event);
  DragStart;
};

let handleDragEnter = (id, handleWidgeFunc, handleRelationErrorFunc, _event) =>
  DragEventBaseUtils.isTriggerDragEnter(
    id,
    handleWidgeFunc,
    handleRelationErrorFunc,
  ) ?
    DragEnter : Nothing;

let handleDragLeave = (id, handleWidgeFunc, handleRelationErrorFunc, event) => {
  DomHelper.stopPropagation(
    ReactEventType.convertReactMouseEventToJsEvent(event),
  );

  DragLeave;
};

let handleDragOver = event => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);
  DomHelper.preventDefault(e);
};

let handleDrop = (uid, handleWidgeFunc, handleRelationErrorFunc, event) => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);
  let startId = DragUtils.getDragedUid(e);
  DragEventBaseUtils.isTriggerDragDrop(
    uid,
    startId,
    handleWidgeFunc,
    handleRelationErrorFunc,
  ) ?
    DragDrop(uid, startId) : DragLeave;
};

let handleDrageEnd = _event => {
  CurrentDragSourceEditorService.clearCurrentDragSource
  |> StateLogicService.getAndSetEditorState;
  DragEnd;
};