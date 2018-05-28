external convert : DomHelper.imgType => Js.t({..}) = "%identity";

let dragStart = (uid, sign, event) => {
  let e = ReactEvent.convertReactMouseEventToJsEvent(event);
  DomHelper.stopPropagation(e);
  WonderLog.Log.print("createImg") |> ignore;
  /* TODO can't create img too much */
  let img = DomHelper.createElement("img") |> convert;
  e##dataTransfer##setDragImage(img, 0, 0);
  /* e##dataTransfer##setDragImage(DomHelper.createElement("img"), 0, 0); */
  DragUtils.setDataTransferEffectIsMove(e);
  DragUtils.setDragedUid(uid, e);
  CurrentDragSourceEditorService.setCurrentDragSource((sign, uid))
  |> StateLogicService.getAndSetEditorState
};

let isTreeNodeRelationValid = (startId, targetId, handleRelationError) =>
  switch startId {
  | None => false
  | Some(startId) =>
    ! (handleRelationError(startId, targetId) |> StateLogicService.getStateToGetData)
  };

let isTriggerDragEnter = (id, handleSign, handleRelationError) => {
  let (sign, startId) =
    StateEditorService.getState() |> CurrentDragSourceEditorService.getCurrentDragSource;
  handleSign(sign) && isTreeNodeRelationValid(startId, id, handleRelationError)
};

let isTriggerDragLeave = (id, handleSign, handleRelationError, event) => {
  let (sign, startId) =
    StateEditorService.getState() |> CurrentDragSourceEditorService.getCurrentDragSource;
  handleSign(sign) && isTreeNodeRelationValid(startId, id, handleRelationError)
};

let isTriggerDragDrop = (uid, startId, handleRelationError) =>
  handleRelationError(uid, startId) |> StateLogicService.getStateToGetData;