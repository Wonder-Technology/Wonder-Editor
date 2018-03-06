'use strict';

import * as SceneLogicService$WonderEditor from "../service/logic_service/single/SceneLogicService.js";

function unsafeGetScene(param) {
  return SceneLogicService$WonderEditor.unsafeGetScene(param[0]);
}

export {
  unsafeGetScene ,
  
}
/* SceneLogicService-WonderEditor Not a pure module */
