let dragStart = (id, widget, dragImg, effectAllowd, event) => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);

  EventHelper.stopPropagation(e);
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

let _isTreeNodeRelationValid = (targetId, startId, checkNodeRelationFunc) =>
  switch (startId) {
  | None => (false, None)
  | Some(startId) =>
    let relationResult =
      checkNodeRelationFunc(startId, targetId)
      |> StateLogicService.getStateToGetData;

    (
      relationResult |> Result.RelationResult.isSuccess,
      Some(relationResult),
    );
  };

let isValidForDragEnter = (id, isWidgetFunc, checkNodeRelationFunc) => {
  let (widget, startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  ! isWidgetFunc(widget) ?
    (false, None) :
    _isTreeNodeRelationValid(id, startId, checkNodeRelationFunc);
};

let isValidForDragDrop = (id, startId, isWidgetFunc, checkNodeRelationFunc) => {
  let (widget, _startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  ! isWidgetFunc(widget) ?
    (false, None) :
    _isTreeNodeRelationValid(id, Some(startId), checkNodeRelationFunc);
};