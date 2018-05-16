let dragStart = (uid, sign, event) => {
  /* TODO not test these */
  let e = ReactEvent.convertReactMouseEventToJsEvent(event);
  e##dataTransfer##setDragImage(DomHelper.createElement("img"), (-10), (-10));
  DomHelper.stopPropagation(e);
  DragUtils.setDataTransferEffectIsMove(e);
  DragUtils.setdragedUid(uid, e);
  CurrentSignEditorService.setCurrentSign(sign) |> StateLogicService.getAndSetEditorState
};