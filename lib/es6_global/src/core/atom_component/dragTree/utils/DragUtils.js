


function getDragedUid(e) {
  return Number(e.dataTransfer.getData("dragedUid"));
}

function setDragedUid(dragedUid, e) {
  return e.dataTransfer.setData("dragedUid", dragedUid);
}

function setDataTransferEffectIsMove(e) {
  e.dataTransfer.effectAllowed = "move";
  return /* () */0;
}

export {
  getDragedUid ,
  setDragedUid ,
  setDataTransferEffectIsMove ,
  
}
/* No side effect */
