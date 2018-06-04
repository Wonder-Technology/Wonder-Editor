

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DomHelper$WonderEditor from "../../../core/external/DomHelper.js";
import * as AtomComponentUtils$WonderEditor from "./AtomComponentUtils.js";

function buildComponentByName(componentName, argumentArray) {
  switch (componentName) {
    case "button" : 
        return Curry._2(DomHelper$WonderEditor.apply, argumentArray, AtomComponentUtils$WonderEditor.buildButton);
    case "div" : 
        return Curry._2(DomHelper$WonderEditor.apply, argumentArray, AtomComponentUtils$WonderEditor.buildDiv);
    case "float_input" : 
        return Curry._2(DomHelper$WonderEditor.apply, argumentArray, AtomComponentUtils$WonderEditor.buildFloatInput);
    default:
      Log$WonderLog.error(Log$WonderLog.buildErrorMessage("buildComponentByName", "the specific component: " + (String(componentName) + " is not find"), "", "check extension->panelExtension->render->name->" + (String(componentName) + " should correct"), "componentName: " + (String(componentName) + "")));
      return null;
  }
}

export {
  buildComponentByName ,
  
}
/* Log-WonderLog Not a pure module */
