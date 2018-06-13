type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragEnd
  | DragStart
  | DragDrop(int, int);

let handleDragStart = (id, flag, dragImg, event) => {
  DragEventBaseUtils.dragStart(id, flag, dragImg, event);
  DragStart;
};

let handleDragEnter = (id, handleFlagFunc, handleRelationErrorFunc, _event) =>
  DragEventBaseUtils.isTriggerDragEnter(
    id,
    handleFlagFunc,
    handleRelationErrorFunc,
  ) ?
    DragEnter : Nothing;

let handleDragLeave = (id, handleFlagFunc, handleRelationErrorFunc, event) => {
  let e = ReactEvent.convertReactMouseEventToJsEvent(event);
  DomHelper.stopPropagation(e);
  DragEventBaseUtils.isTriggerDragLeave(
    id,
    handleFlagFunc,
    handleRelationErrorFunc,
  ) ?
    DragLeave : Nothing;
};

let handleDragOver = event => {
  let e = ReactEvent.convertReactMouseEventToJsEvent(event);
  DomHelper.preventDefault(e);
};

let handleDrop = (uid, handleFlagFunc, handleRelationErrorFunc, event) => {
  let e = ReactEvent.convertReactMouseEventToJsEvent(event);
  let startId = DragUtils.getDragedUid(e);
  DragEventBaseUtils.isTriggerDragDrop(
    uid,
    startId,
    handleFlagFunc,
    handleRelationErrorFunc,
  ) ?
    DragDrop(uid, startId) : DragLeave;
};

let handleDrageEnd = _event => {
  CurrentDragSourceEditorService.clearCurrentDragSource
  |> StateLogicService.getAndSetEditorState;
  DragEnd;
};