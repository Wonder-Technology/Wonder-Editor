let dragStart = (uid, flag, dragImg, event) => {
  let e = ReactEvent.convertReactMouseEventToJsEvent(event);

  DomHelper.stopPropagation(e);
  e##dataTransfer##setDragImage(dragImg |> DomHelper.convertDomToJsObj, 0, 0)
  |> ignore;
  DragUtils.setDataTransferEffectIsMove(e);
  DragUtils.setDragedUid(uid, e);
  CurrentDragSourceEditorService.setCurrentDragSource((flag, uid))
  |> StateLogicService.getAndSetEditorState;
};

let _isTreeNodeRelationValid = (targetId, startId, handleRelationErrorFunc) =>
  switch (startId) {
  | None => false
  | Some(startId) =>
    ! (
      handleRelationErrorFunc(targetId, startId)
      |> StateLogicService.getStateToGetData
    )
  };

let isTriggerDragEnter = (id, handleFlagFunc, handleRelationErrorFunc) => {
  let (flag, startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  handleFlagFunc(flag)
  && _isTreeNodeRelationValid(id, startId, handleRelationErrorFunc);
};

let isTriggerDragLeave = (id, handleFlagFunc, handleRelationErrorFunc) => {
  let (flag, startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  handleFlagFunc(flag)
  && _isTreeNodeRelationValid(id, startId, handleRelationErrorFunc);
};

let isTriggerDragDrop = (id, startId, handleFlagFunc, handleRelationErrorFunc) => {
  let (flag, _startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  handleFlagFunc(flag)
  && _isTreeNodeRelationValid(id, Some(startId), handleRelationErrorFunc);
};