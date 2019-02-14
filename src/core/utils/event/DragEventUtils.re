let handleDragStart =
    ((id, dragStartAction, widget), (dragImg, effectAllowd), event) => {
  DragEventBaseUtils.dragStart(id, widget, (dragImg, effectAllowd), event);
  dragStartAction;
};

let handleDragEnter =
    (
      id,
      (dragEnterAction, nothingAction),
      (isWidgetFunc, checkNodeRelationFunc),
      _event,
    ) => {
  let (isValid, _) =
    DragEventBaseUtils.isValidForDragEnter(
      id,
      isWidgetFunc,
      checkNodeRelationFunc,
    );

  isValid ? dragEnterAction : nothingAction;
};

let handleDragLeave = (id, dragLeaveAction, event) => {
  EventHelper.stopPropagation(
    ReactEventType.convertReactMouseEventToJsEvent(event),
  );

  dragLeaveAction;
};

let handleDragOver = (dropEffect, event) => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);

  DragUtils.setDataTransferDropEffect(dropEffect, e);

  EventHelper.preventDefault(e);
};

let handleDrop =
    (
      id,
      (dragDropActionFunc, dragLeaveAction),
      (isWidgetFunc, checkNodeRelationFunc),
      event,
    ) => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);
  let startId = DragUtils.getDragedId(e);

  EventHelper.preventDefault(e);

  let (isValid, relationResult) =
    DragEventBaseUtils.isValidForDragDrop(
      id,
      startId,
      isWidgetFunc,
      checkNodeRelationFunc,
    );

  relationResult
  |> OptionService.handleSomeAndIgnore(relationResult =>
       relationResult
       |> Result.RelationResult.handleError(msgOpt =>
            OptionService.handleSomeAndIgnore(
              msg => ConsoleUtils.error(msg, StateEditorService.getState()),
              msgOpt,
            )
          )
     );

  isValid ? dragDropActionFunc(id, startId) : dragLeaveAction;
};

let handleDragEnd = (dragEndAction, _event) => {
  CurrentDragSourceEditorService.clearCurrentDragSource
  |> StateLogicService.getAndSetEditorState;

  dragEndAction;
};