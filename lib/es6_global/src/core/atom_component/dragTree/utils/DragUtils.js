'use strict';


function getDragedUid(e) {
  return Number(e.dataTransfer.getData("dragedUid"));
}

function setDragedUid(dragedUid, e) {
  return e.dataTransfer.setData("dragedUid", dragedUid);
}

function setDataTransferEffectIsMove(e) {
  return e.dataTransfer.effectAllowed = "move";
}

export {
  getDragedUid                ,
  setDragedUid                ,
  setDataTransferEffectIsMove ,
  
}
/* No side effect */
