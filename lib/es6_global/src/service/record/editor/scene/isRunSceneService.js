


function getIsRun(sceneRecord) {
  return sceneRecord[/* isRun */2];
}

function setIsRun(isRun, sceneRecord) {
  return /* record */[
          /* currentSceneTreeNode */sceneRecord[/* currentSceneTreeNode */0],
          /* diffMap */sceneRecord[/* diffMap */1],
          /* isRun */isRun
        ];
}

export {
  getIsRun ,
  setIsRun ,
  
}
/* No side effect */
