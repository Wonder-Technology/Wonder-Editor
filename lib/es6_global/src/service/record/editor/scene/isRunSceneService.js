'use strict';


function getIsRun(sceneRecord) {
  return sceneRecord[/* isRun */3];
}

function setIsRun(isRun, sceneRecord) {
  return /* record */[
          /* root */sceneRecord[/* root */0],
          /* currentSceneTreeNode */sceneRecord[/* currentSceneTreeNode */1],
          /* diffMap */sceneRecord[/* diffMap */2],
          /* isRun */isRun
        ];
}

export {
  getIsRun ,
  setIsRun ,
  
}
/* No side effect */
