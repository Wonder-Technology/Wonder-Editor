

import * as LogUtils$WonderEditor from "../../../core/utils/console/LogUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../core/utils/ui/ConsoleUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "./gameObject/GameObjectComponentEngineService.js";

function getMaterialComponent(gameObject, param) {
  var engineState = param[1];
  var match = GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(gameObject, engineState);
  if (match) {
    return GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(gameObject, engineState);
  } else {
    var match$1 = GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(gameObject, engineState);
    if (match$1) {
      return GameObjectComponentEngineService$WonderEditor.getLightMaterialComponent(gameObject, engineState);
    } else {
      ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("gameObject:" + (String(gameObject) + " should has material component"), "", "", ""), param[0]);
      return undefined;
    }
  }
}

export {
  getMaterialComponent ,
  
}
/* ConsoleUtils-WonderEditor Not a pure module */
