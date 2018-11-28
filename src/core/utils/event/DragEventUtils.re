type action =
  | TogggleChildren(int)
  | Nothing
  | DragEnter
  | DragLeave
  | DragEnd
  | DragStart
  | DragDrop(int, int);

let handleDragStart = (id, widget, dragImg, effectAllowd, event) => {
  DragEventBaseUtils.dragStart(id, widget, dragImg, effectAllowd, event);
  DragStart;
};

let handleDragEnter = (id, isWidgetFunc, handleRelationErrorFunc, _event) =>
  DragEventBaseUtils.isTriggerDragEnter(
    id,
    isWidgetFunc,
    handleRelationErrorFunc,
  ) ?
    DragEnter : Nothing;

let handleDragLeave = (id, event) => {
  DomHelper.stopPropagation(
    ReactEventType.convertReactMouseEventToJsEvent(event),
  );

  DragLeave;
};

let handleDragOver = (dropEffect, event) => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);

  DragUtils.setDataTransferDropEffect(dropEffect, e);

  DomHelper.preventDefault(e);
};

let handleDrop = (id, isWidgetFunc, handleRelationErrorFunc, event) => {
  let e = ReactEventType.convertReactMouseEventToJsEvent(event);
  let startId = DragUtils.getDragedId(e);

  DomHelper.preventDefault(e);

  DragEventBaseUtils.isTriggerDragDrop(
    id,
    startId,
    isWidgetFunc,
    handleRelationErrorFunc,
  ) ?
    DragDrop(id, startId) : DragLeave;
};

let handleDrageEnd = _event => {
  CurrentDragSourceEditorService.clearCurrentDragSource
  |> StateLogicService.getAndSetEditorState;
  DragEnd;
};