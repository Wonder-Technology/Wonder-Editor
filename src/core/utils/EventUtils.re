let dragStart = (uid, sign, dragImg, event) => {
  let e = ReactEvent.convertReactMouseEventToJsEvent(event);
  DomHelper.stopPropagation(e);
  e##dataTransfer##setDragImage(dragImg |> DomHelper.convertDomToJsObj, 0, 0) |> ignore;
  DragUtils.setDataTransferEffectIsMove(e);
  DragUtils.setDragedUid(uid, e);
  CurrentDragSourceEditorService.setCurrentDragSource((sign, uid))
  |> StateLogicService.getAndSetEditorState
};

let _isTreeNodeRelationValid = (targetId, startId, handleRelationError) =>
  switch startId {
  | None => false
  | Some(startId) =>
    ! (handleRelationError(targetId, startId) |> StateLogicService.getStateToGetData)
  };

let isTriggerDragEnter = (id, handleSign, handleRelationError) => {
  let (sign, startId) =
    StateEditorService.getState() |> CurrentDragSourceEditorService.getCurrentDragSource;
  handleSign(sign) && _isTreeNodeRelationValid(id, startId, handleRelationError)
};

let isTriggerDragLeave = (id, handleSign, handleRelationError, _event) => {
  let (sign, startId) =
    StateEditorService.getState() |> CurrentDragSourceEditorService.getCurrentDragSource;
  handleSign(sign) && _isTreeNodeRelationValid(id, startId, handleRelationError)
};

let isTriggerDragDrop = (uid, startId, handleRelationError) =>
  handleRelationError(uid, startId) |> StateLogicService.getStateToGetData;