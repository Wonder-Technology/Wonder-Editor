let getDragedId = (e) : int => JsTypeHelper.convertStringToInt(e##dataTransfer##getData("dragedId"));

let setDragedId = (dragedId, e) : unit => e##dataTransfer##setData("dragedId", dragedId);

let setDataTransferEffectIsMove = (e) : unit => e##dataTransfer##effectAllowed#="move";