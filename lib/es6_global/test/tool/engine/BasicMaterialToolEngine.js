

import * as JobEngineService$WonderEditor from "../../../src/service/state/engine/JobEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../src/service/state/engine/BasicMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectComponentEngineService.js";

function replaceGameObjectLightMaterialToBasicMaterialAndRefreshDispose(gameObject, state) {
  var match = BasicMaterialEngineService$WonderEditor.create(state);
  var state$1 = match[0];
  return JobEngineService$WonderEditor.execDisposeJob(GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent(gameObject, match[1], GameObjectComponentEngineService$WonderEditor.disposeLightMaterialComponent(gameObject, GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, state$1), state$1)));
}

export {
  replaceGameObjectLightMaterialToBasicMaterialAndRefreshDispose ,
  
}
/* JobEngineService-WonderEditor Not a pure module */
