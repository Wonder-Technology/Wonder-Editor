'use strict';

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function unsafeGetCurrentSceneTreeNode(sceneRecord) {
  return OptionService$WonderEditor.unsafeGet(sceneRecord[/* currentSceneTreeNode */1]);
}

function getCurrentSceneTreeNode(sceneRecord) {
  return sceneRecord[/* currentSceneTreeNode */1];
}

function setCurrentSceneTreeNode(gameObject, sceneRecord) {
  return /* record */[
          /* root */sceneRecord[/* root */0],
          /* currentSceneTreeNode : Some */[gameObject],
          /* diffMap */sceneRecord[/* diffMap */2],
          /* isRun */sceneRecord[/* isRun */3]
        ];
}

function clearCurrentSceneTreeNode(sceneRecord) {
  return /* record */[
          /* root */sceneRecord[/* root */0],
          /* currentSceneTreeNode : None */0,
          /* diffMap */sceneRecord[/* diffMap */2],
          /* isRun */sceneRecord[/* isRun */3]
        ];
}

export {
  unsafeGetCurrentSceneTreeNode ,
  getCurrentSceneTreeNode       ,
  setCurrentSceneTreeNode       ,
  clearCurrentSceneTreeNode     ,
  
}
/* OptionService-WonderEditor Not a pure module */
