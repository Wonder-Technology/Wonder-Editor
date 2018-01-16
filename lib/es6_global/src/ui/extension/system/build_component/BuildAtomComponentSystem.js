'use strict';

import * as Curry                            from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                    from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DomHelper$WonderEditor           from "../../../../external/DomHelper.js";
import * as AtomComponentSystem$WonderEditor from "./AtomComponentSystem.js";

function buildComponentByName(componentName, argumentArray) {
  switch (componentName) {
    case "button" : 
        return Curry._2(DomHelper$WonderEditor.apply, argumentArray, AtomComponentSystem$WonderEditor.buildButton);
    case "div" : 
        return Curry._2(DomHelper$WonderEditor.apply, argumentArray, AtomComponentSystem$WonderEditor.buildDiv);
    case "float_input" : 
        return Curry._2(DomHelper$WonderEditor.apply, argumentArray, AtomComponentSystem$WonderEditor.buildFloatInput);
    default:
      Log$WonderLog.error(Log$WonderLog.buildErrorMessage("buildComponentByName", "the specific component: " + (String(componentName) + " is not find"), "", "check extension->panelExtension->render->name->" + (String(componentName) + " should correct"), "componentName: " + (String(componentName) + "")));
      return null;
  }
}

export {
  buildComponentByName ,
  
}
/* Log-WonderLog Not a pure module */
