


function getDragedId(e) {
  return Number(e.dataTransfer.getData("draggedId"));
}

function setDragedId(draggedId, e) {
  return e.dataTransfer.setData("draggedId", draggedId);
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
