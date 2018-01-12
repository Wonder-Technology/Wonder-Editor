let getDragedId = (e) => DomHelper.makeStringToInt(e##dataTransfer##getData("dragedId"));

let setDragedId = (dragedId, e) => e##dataTransfer##setData("dragedId", dragedId);

let setDataTransferEffectIsMove = (e) => e##dataTransfer##effectAllowed#="move";