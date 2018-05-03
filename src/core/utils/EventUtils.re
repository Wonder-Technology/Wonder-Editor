let dragStart = (uid, sign, event) => {
  let e = ReactEvent.convertReactMouseEventToJsEvent(event);
  DomHelper.stopPropagation(e);
  DragUtils.setDataTransferEffectIsMove(e);
  DragUtils.setdragedUid(uid, e);
  CurrentSignEditorService.setCurrentSign(sign) |> StateLogicService.getAndSetEditorState
};
