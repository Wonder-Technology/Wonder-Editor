

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function unsafeGetCurrentSceneTreeNode(sceneTreeRecord) {
  return OptionService$WonderEditor.unsafeGet(sceneTreeRecord[/* currentSceneTreeNode */0]);
}

function getCurrentSceneTreeNode(sceneTreeRecord) {
  return sceneTreeRecord[/* currentSceneTreeNode */0];
}

function setCurrentSceneTreeNode(gameObject, sceneTreeRecord) {
  return /* record */[
          /* currentSceneTreeNode */gameObject,
          /* isShowChildrenMap */sceneTreeRecord[/* isShowChildrenMap */1]
        ];
}

function clearCurrentSceneTreeNode(sceneTreeRecord) {
  return /* record */[
          /* currentSceneTreeNode */undefined,
          /* isShowChildrenMap */sceneTreeRecord[/* isShowChildrenMap */1]
        ];
}

export {
  unsafeGetCurrentSceneTreeNode ,
  getCurrentSceneTreeNode ,
  setCurrentSceneTreeNode ,
  clearCurrentSceneTreeNode ,
  
}
/* OptionService-WonderEditor Not a pure module */
