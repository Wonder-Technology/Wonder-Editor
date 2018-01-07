'use strict';


function getDragedId(e) {
  return e.dataTransfer.getData("dragedId");
}

export {
  getDragedId ,
  
}
/* No side effect */
