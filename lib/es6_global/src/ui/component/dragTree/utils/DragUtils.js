'use strict';


function getDragedId(e) {
  return Number(e.dataTransfer.getData("dragedId"));
}

function setDragedId(dragedId, e) {
  return e.dataTransfer.setData("dragedId", dragedId);
}

function setDataTransferEffectIsMove(e) {
  return e.dataTransfer.effectAllowed = "move";
}

export {
  getDragedId                 ,
  setDragedId                 ,
  setDataTransferEffectIsMove ,
  
}
/* No side effect */
