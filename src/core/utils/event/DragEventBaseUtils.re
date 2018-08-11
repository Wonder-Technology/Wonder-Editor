let dragStart = (uid, widge, dragImg, event) => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);

  DomHelper.stopPropagation(e);
  e##dataTransfer##setDragImage(dragImg |> DomHelperType.convertDomToJsObj, 0, 0)
  |> ignore;
  DragUtils.setDataTransferEffectIsMove(e);
  DragUtils.setDragedUid(uid, e);
  CurrentDragSourceEditorService.setCurrentDragSource((widge, uid))
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

let isTriggerDragEnter = (id, handleWidgeFunc, handleRelationErrorFunc) => {
  let (widge, startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  handleWidgeFunc(widge)
  && _isTreeNodeRelationValid(id, startId, handleRelationErrorFunc);
};

let isTriggerDragLeave = (id, handleWidgeFunc, handleRelationErrorFunc) => {
  let (widge, startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  handleWidgeFunc(widge)
  && _isTreeNodeRelationValid(id, startId, handleRelationErrorFunc);
};

let isTriggerDragDrop = (id, startId, handleWidgeFunc, handleRelationErrorFunc) => {
  let (widge, _startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  handleWidgeFunc(widge)
  && _isTreeNodeRelationValid(id, Some(startId), handleRelationErrorFunc);
};