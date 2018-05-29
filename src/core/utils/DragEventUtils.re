type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragEnd
  | DragStart
  | DragDrop(int, int);

let handleDragStart = (id, sign, dragImg, event) => {
  EventUtils.dragStart(id, sign, dragImg, event);
  DragStart
};

let handleDragEnter = (id, handleSign, handleRelationError, _event) => {
  EventUtils.isTriggerDragEnter(id, handleSign, handleRelationError) ? DragEnter : Nothing
};

let handleDragLeave = (id, handleSign, handleRelationError, event) => {
  let e = ReactEvent.convertReactMouseEventToJsEvent(event);
  DomHelper.stopPropagation(e);
  EventUtils.isTriggerDragLeave(id, handleSign, handleRelationError, event) ? DragLeave : Nothing
};

let handleDragOver = (event) => {
  let e = ReactEvent.convertReactMouseEventToJsEvent(event);
  DomHelper.preventDefault(e)
};

let handleDrop = (uid, handleRelationError, event) => {
  let e = ReactEvent.convertReactMouseEventToJsEvent(event);
  let startId = DragUtils.getDragedUid(e);
  EventUtils.isTriggerDragDrop(uid, startId, handleRelationError) ?
    DragLeave : DragDrop(uid, startId)
};

let handleDrageEnd = (_event) => {
  CurrentDragSourceEditorService.clearCurrentDragSource |> StateLogicService.getAndSetEditorState;
  DragEnd
};