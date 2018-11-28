let getDragedId = e : int =>
  JsTypeHelper.convertStringToInt(e##dataTransfer##getData("dragedId"));

let setDragedId = (dragedId, e) : unit =>
  e##dataTransfer##setData("dragedId", dragedId);

let setDataTransferEffectAllowed = (effectAllowed, e) : unit => e##dataTransfer##effectAllowed#=effectAllowed;

let setDataTransferDropEffect = (dropEffect, e) : unit => e##dataTransfer##dropEffect#=dropEffect;