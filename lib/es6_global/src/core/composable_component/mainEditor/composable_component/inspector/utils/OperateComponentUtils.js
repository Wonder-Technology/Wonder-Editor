

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function getInspectorComponentType(type_) {
  switch (type_) {
    case "ArcballCameraController" : 
        return /* ArcballCameraController */3;
    case "CameraGroup" : 
        return /* CameraGroup */4;
    case "Geometry" : 
        return /* Geometry */2;
    case "Light" : 
        return /* Light */5;
    case "RenderGroup" : 
        return /* RenderGroup */1;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getInspectorComponentType", "the type:" + (String(type_) + " in InspectorComponentType is can\'t add"), "", "", ""));
  }
}

export {
  getInspectorComponentType ,
  
}
/* Log-WonderLog Not a pure module */
