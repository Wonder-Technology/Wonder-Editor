

import * as LogUtils$WonderEditor from "../../../../../utils/console/LogUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../../../utils/ui/ConsoleUtils.js";
import * as LightEngineService$WonderEditor from "../../../../../../service/state/engine/LightEngineService.js";
import * as CameraEngineService$WonderEditor from "../../../../../../service/state/engine/camera/CameraEngineService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "./InspectorRenderGroupUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function isHasSpecificComponentByType(type_, gameObject, param) {
  var engineState = param[1];
  var exit = 0;
  switch (type_) {
    case 1 : 
        return InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(gameObject, engineState);
    case 2 : 
        return GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(gameObject, engineState);
    case 3 : 
        return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(gameObject, engineState);
    case 4 : 
        return CameraEngineService$WonderEditor.hasCameraGroup(gameObject, engineState);
    case 5 : 
        return LightEngineService$WonderEditor.hasLightComponent(gameObject, engineState);
    case 7 : 
        return GameObjectComponentEngineService$WonderEditor.hasScriptComponent(gameObject, engineState);
    case 0 : 
    case 6 : 
    case 8 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("the type:" + (String(type_) + " in inspectorComponentType can\'t be judge"), "", "", ""), param[0]);
    return false;
  }
  
}

export {
  isHasSpecificComponentByType ,
  
}
/* LogUtils-WonderEditor Not a pure module */
