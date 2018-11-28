


function getDragedId(e) {
  return Number(e.dataTransfer.getData("dragedId"));
}

function setDragedId(dragedId, e) {
  return e.dataTransfer.setData("dragedId", dragedId);
}

function setDataTransferEffectAllowed(effectAllowed, e) {
  e.dataTransfer.effectAllowed = effectAllowed;
  return /* () */0;
}

function setDataTransferDropEffect(dropEffect, e) {
  e.dataTransfer.dropEffect = dropEffect;
  return /* () */0;
}

export {
  getDragedId ,
  setDragedId ,
  setDataTransferEffectAllowed ,
  setDataTransferDropEffect ,
  
}
/* No side effect */
