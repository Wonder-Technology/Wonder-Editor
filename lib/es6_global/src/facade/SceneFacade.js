'use strict';

import * as SceneLogicSingleService$WonderEditor from "../service/logic_service/single/SceneLogicSingleService.js";

function unsafeGetScene(param) {
  return SceneLogicSingleService$WonderEditor.unsafeGetScene(param[0]);
}

export {
  unsafeGetScene ,
  
}
/* SceneLogicSingleService-WonderEditor Not a pure module */
