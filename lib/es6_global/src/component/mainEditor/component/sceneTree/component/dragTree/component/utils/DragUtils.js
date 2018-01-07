'use strict';


function getDragedId(e) {
  return Number(e.dataTransfer.getData("dragedId"));
}

export {
  getDragedId ,
  
}
/* No side effect */
