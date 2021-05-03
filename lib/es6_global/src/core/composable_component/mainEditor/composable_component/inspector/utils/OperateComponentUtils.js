

import * as LogUtils$WonderEditor from "../../../../../utils/console/LogUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../../../utils/ui/ConsoleUtils.js";

function getInspectorComponentType(type_, editorState) {
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
    case "Script" : 
        return /* Script */7;
    default:
      ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("unknown type:" + (String(type_) + ""), "", "", ""), editorState);
      return /* Unknown */8;
  }
}

export {
  getInspectorComponentType ,
  
}
/* LogUtils-WonderEditor Not a pure module */
