'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function unsafeGetCurrentGameObject(sceneRecord) {
  return OptionService$WonderEditor.unsafeGet(sceneRecord[/* currentGameObject */1]);
}

function getCurrentGameObject(sceneRecord) {
  return sceneRecord[/* currentGameObject */1];
}

function setCurrentGameObject(gameObject, sceneRecord) {
  return /* record */[
          /* root */sceneRecord[/* root */0],
          /* currentGameObject : Some */[gameObject],
          /* diffMap */sceneRecord[/* diffMap */2],
          /* isRun */sceneRecord[/* isRun */3]
        ];
}

function clearCurrentGameObject(sceneRecord) {
  return /* record */[
          /* root */sceneRecord[/* root */0],
          /* currentGameObject : None */0,
          /* diffMap */sceneRecord[/* diffMap */2],
          /* isRun */sceneRecord[/* isRun */3]
        ];
}

export {
  unsafeGetCurrentGameObject ,
  getCurrentGameObject       ,
  setCurrentGameObject       ,
  clearCurrentGameObject     ,
  
}
/* OptionService-WonderEditor Not a pure module */
