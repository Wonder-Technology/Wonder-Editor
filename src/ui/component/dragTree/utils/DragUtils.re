let getDragedId = (e) : int => DomHelper.makeStringToInt(e##dataTransfer##getData("dragedId"));

let setDragedId = (dragedId, e) : unit => e##dataTransfer##setData("dragedId", dragedId);

let setDataTransferEffectIsMove = (e) : unit => e##dataTransfer##effectAllowed#="move";