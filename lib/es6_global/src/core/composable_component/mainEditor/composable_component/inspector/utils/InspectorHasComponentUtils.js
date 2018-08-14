

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LightEngineService$WonderEditor from "../../../../../../service/state/engine/LightEngineService.js";
import * as CameraEngineService$WonderEditor from "../../../../../../service/state/engine/CameraEngineService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "./InspectorRenderGroupUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function isHasSpecificComponentByType(type_, gameObject, engineState) {
  var exit = 0;
  switch (type_) {
    case 1 : 
        return InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(gameObject, engineState);
    case 3 : 
        return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(gameObject, engineState);
    case 4 : 
        return CameraEngineService$WonderEditor.hasCameraGroup(gameObject, engineState);
    case 5 : 
        return LightEngineService$WonderEditor.hasLightComponent(gameObject, engineState);
    case 0 : 
    case 2 : 
    case 6 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("isHasSpecificComponentByType", "the type:" + (String(type_) + " in inspectorComponentType is can\'t add "), "", "", ""));
  }
  
}

export {
  isHasSpecificComponentByType ,
  
}
/* Log-WonderLog Not a pure module */
