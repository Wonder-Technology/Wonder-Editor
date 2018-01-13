'use strict';


function getdragedUid(e) {
  return Number(e.dataTransfer.getData("dragedUid"));
}

function setdragedUid(dragedUid, e) {
  return e.dataTransfer.setData("dragedUid", dragedUid);
}

function setDataTransferEffectIsMove(e) {
  return e.dataTransfer.effectAllowed = "move";
}

export {
  getdragedUid                ,
  setdragedUid                ,
  setDataTransferEffectIsMove ,
  
}
/* No side effect */
