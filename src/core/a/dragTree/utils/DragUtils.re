let getDragedId = e : int =>
  JsTypeHelper.convertStringToInt(e##dataTransfer##getData("draggedId"));

let setDragedId = (draggedId, e) : unit =>
  e##dataTransfer##setData("draggedId", draggedId);

let setDataTransferEffectAllowed = (effectAllowed, e) : unit => e##dataTransfer##effectAllowed#=effectAllowed;

let setDataTransferDropEffect = (dropEffect, e) : unit => e##dataTransfer##dropEffect#=dropEffect;