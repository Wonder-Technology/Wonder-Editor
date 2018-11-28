

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function unsafeGetCurrentSceneTreeNode(sceneRecord) {
  return OptionService$WonderEditor.unsafeGet(sceneRecord[/* currentSceneTreeNode */0]);
}

function getCurrentSceneTreeNode(sceneRecord) {
  return sceneRecord[/* currentSceneTreeNode */0];
}

function setCurrentSceneTreeNode(gameObject, _) {
  return /* record */[/* currentSceneTreeNode */gameObject];
}

function clearCurrentSceneTreeNode() {
  return /* record */[/* currentSceneTreeNode */undefined];
}

export {
  unsafeGetCurrentSceneTreeNode ,
  getCurrentSceneTreeNode ,
  setCurrentSceneTreeNode ,
  clearCurrentSceneTreeNode ,
  
}
/* OptionService-WonderEditor Not a pure module */
