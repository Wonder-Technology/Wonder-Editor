'use strict';


function getDragedId(e) {
  return Number(e.dataTransfer.getData("dragedId"));
}

function setDragedId(dragedId, e) {
  return e.dataTransfer.setData("dragedId", dragedId);
}

export {
  getDragedId ,
  setDragedId ,
  
}
/* No side effect */
