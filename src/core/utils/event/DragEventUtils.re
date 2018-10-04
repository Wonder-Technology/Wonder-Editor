type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragEnd
  | DragStart
  | DragDrop(int, int);

let handleDragStart = (id, widget, dragImg, event) => {
  DragEventBaseUtils.dragStart(id, widget, dragImg, event);
  DragStart;
};

let handleDragEnter = (id, handleWidgetFunc, handleRelationErrorFunc, _event) =>
  DragEventBaseUtils.isTriggerDragEnter(
    id,
    handleWidgetFunc,
    handleRelationErrorFunc,
  ) ?
    DragEnter : Nothing;

let handleDragLeave = (id, handleWidgetFunc, handleRelationErrorFunc, event) => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);
  DomHelper.stopPropagation(e);
  DragEventBaseUtils.isTriggerDragLeave(
    id,
    handleWidgetFunc,
    handleRelationErrorFunc,
  ) ?
    DragLeave : Nothing;
};

let handleDragOver = event => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);
  DomHelper.preventDefault(e);
};

let handleDrop = (uid, handleWidgetFunc, handleRelationErrorFunc, event) => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);
  let startId = DragUtils.getDragedUid(e);
  DragEventBaseUtils.isTriggerDragDrop(
    uid,
    startId,
    handleWidgetFunc,
    handleRelationErrorFunc,
  ) ?
    DragDrop(uid, startId) : DragLeave;
};

let handleDrageEnd = _event => {
  CurrentDragSourceEditorService.clearCurrentDragSource
  |> StateLogicService.getAndSetEditorState;
  DragEnd;
};