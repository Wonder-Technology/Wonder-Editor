

import * as GameObjectComponentEngineService$WonderEditor from "./gameObject/GameObjectComponentEngineService.js";

function hasLightComponent(gameObject, engineState) {
  if (GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent(gameObject, engineState)) {
    return true;
  } else {
    return GameObjectComponentEngineService$WonderEditor.hasPointLightComponent(gameObject, engineState);
  }
}

export {
  hasLightComponent ,
  
}
/* GameObjectComponentEngineService-WonderEditor Not a pure module */
