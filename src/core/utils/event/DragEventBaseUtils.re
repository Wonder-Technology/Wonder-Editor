let dragStart = (id, widget, dragImg, event) => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);

  DomHelper.stopPropagation(e);
  e##dataTransfer##setDragImage(dragImg |> DomHelperType.convertDomToJsObj, 0, 0)
  |> ignore;
  DragUtils.setDataTransferEffectIsMove(e);
  DragUtils.setDragedId(id, e);
  CurrentDragSourceEditorService.setCurrentDragSource((widget, id))
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

let isTriggerDragEnter = (id, handleWidgetFunc, handleRelationErrorFunc) => {
  let (widget, startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  handleWidgetFunc(widget)
  && _isTreeNodeRelationValid(id, startId, handleRelationErrorFunc);
};

let isTriggerDragLeave = (id, handleWidgetFunc, handleRelationErrorFunc) => {
  let (widget, startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  handleWidgetFunc(widget)
  && _isTreeNodeRelationValid(id, startId, handleRelationErrorFunc);
};

let isTriggerDragDrop = (id, startId, handleWidgetFunc, handleRelationErrorFunc) => {
  let (widget, _startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  handleWidgetFunc(widget)
  && _isTreeNodeRelationValid(id, Some(startId), handleRelationErrorFunc);
};