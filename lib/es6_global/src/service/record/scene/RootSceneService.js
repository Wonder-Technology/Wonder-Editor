'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function unsafeGetScene(sceneRecord) {
  return OptionService$WonderEditor.unsafeGet(sceneRecord[/* root */0]);
}

function setScene(scene, sceneRecord) {
  return /* record */[
          /* root : Some */[scene],
          /* currentGameObject */sceneRecord[/* currentGameObject */1],
          /* diffMap */sceneRecord[/* diffMap */2],
          /* isRun */sceneRecord[/* isRun */3]
        ];
}

export {
  unsafeGetScene ,
  setScene       ,
  
}
/* OptionService-WonderEditor Not a pure module */
