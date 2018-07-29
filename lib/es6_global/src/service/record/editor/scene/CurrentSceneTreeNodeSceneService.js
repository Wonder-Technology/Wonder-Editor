

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function unsafeGetCurrentSceneTreeNode(sceneRecord) {
  return OptionService$WonderEditor.unsafeGet(sceneRecord[/* currentSceneTreeNode */0]);
}

function getCurrentSceneTreeNode(sceneRecord) {
  return sceneRecord[/* currentSceneTreeNode */0];
}

function setCurrentSceneTreeNode(gameObject, sceneRecord) {
  return /* record */[
          /* currentSceneTreeNode */gameObject,
          /* diffMap */sceneRecord[/* diffMap */1],
          /* isRun */sceneRecord[/* isRun */2]
        ];
}

function clearCurrentSceneTreeNode(sceneRecord) {
  return /* record */[
          /* currentSceneTreeNode */undefined,
          /* diffMap */sceneRecord[/* diffMap */1],
          /* isRun */sceneRecord[/* isRun */2]
        ];
}

export {
  unsafeGetCurrentSceneTreeNode ,
  getCurrentSceneTreeNode ,
  setCurrentSceneTreeNode ,
  clearCurrentSceneTreeNode ,
  
}
/* OptionService-WonderEditor Not a pure module */
