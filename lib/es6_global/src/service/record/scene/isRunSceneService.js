'use strict';


function getIsRun(sceneRecord) {
  return sceneRecord[/* isRun */3];
}

function setIsRun(isRun, sceneRecord) {
  sceneRecord[/* isRun */3] = isRun;
  return sceneRecord;
}

export {
  getIsRun ,
  setIsRun ,
  
}
/* No side effect */
