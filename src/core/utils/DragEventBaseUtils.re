let dragStart = (uid, flag, dragImg, event) => {
  let e = ReactEvent.convertReactMouseEventToJsEvent(event);
  DomHelper.stopPropagation(e);
  e##dataTransfer##setDragImage(dragImg |> DomHelper.convertDomToJsObj, 0, 0) |> ignore;
  DragUtils.setDataTransferEffectIsMove(e);
  DragUtils.setDragedUid(uid, e);
  CurrentDragSourceEditorService.setCurrentDragSource((flag, uid))
  |> StateLogicService.getAndSetEditorState
};

let _isTreeNodeRelationValid = (targetId, startId, handleRelationError) =>
  switch startId {
  | None => false
  | Some(startId) =>
    ! (handleRelationError(targetId, startId) |> StateLogicService.getStateToGetData)
  };

let isTriggerDragEnter = (id, handleFlag, handleRelationError) => {
  let (flag, startId) =
    StateEditorService.getState() |> CurrentDragSourceEditorService.getCurrentDragSource;
  handleFlag(flag) && _isTreeNodeRelationValid(id, startId, handleRelationError)
};

let isTriggerDragLeave = (id, handleFlag, handleRelationError, _event) => {
  let (flag, startId) =
    StateEditorService.getState() |> CurrentDragSourceEditorService.getCurrentDragSource;
  handleFlag(flag) && _isTreeNodeRelationValid(id, startId, handleRelationError)
};

let isTriggerDragDrop = (uid, startId, handleRelationError) =>
  handleRelationError(uid, startId) |> StateLogicService.getStateToGetData;