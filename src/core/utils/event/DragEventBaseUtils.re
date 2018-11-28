let dragStart = (id, widget, dragImg, effectAllowd, event) => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);

  DomHelper.stopPropagation(e);
  e##dataTransfer##setDragImage(
    dragImg |> DomHelperType.convertDomToJsObj,
    0,
    0,
  )
  |> ignore;
  DragUtils.setDataTransferEffectAllowed(effectAllowd, e);
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

let isTriggerDragEnter = (id, isWidgetFunc, handleRelationErrorFunc) => {
  let (widget, startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  isWidgetFunc(widget)
  && _isTreeNodeRelationValid(id, startId, handleRelationErrorFunc);
};

let isTriggerDragDrop = (id, startId, isWidgetFunc, handleRelationErrorFunc) => {
  let (widget, _startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  isWidgetFunc(widget)
  && _isTreeNodeRelationValid(id, Some(startId), handleRelationErrorFunc);
};