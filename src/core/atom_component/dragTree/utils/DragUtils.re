let getDragedUid = (e) : int => JsTypeHelperType.makeStringToInt(e##dataTransfer##getData("dragedUid"));

let setDragedUid = (dragedUid, e) : unit => e##dataTransfer##setData("dragedUid", dragedUid);

let setDataTransferEffectIsMove = (e) : unit => e##dataTransfer##effectAllowed#="move";