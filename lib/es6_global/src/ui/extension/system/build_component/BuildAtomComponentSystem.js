'use strict';

import * as Curry                            from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
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
      console.warn("atom component:" + (String(componentName) + " is not find"));
      return null;
  }
}

export {
  buildComponentByName ,
  
}
/* DomHelper-WonderEditor Not a pure module */
