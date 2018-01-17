let getdragedUid = (e) : int => DomHelper.makeStringToInt(e##dataTransfer##getData("dragedUid"));

let setdragedUid = (dragedUid, e) : unit => e##dataTransfer##setData("dragedUid", dragedUid);

let setDataTransferEffectIsMove = (e) : unit => e##dataTransfer##effectAllowed#="move";