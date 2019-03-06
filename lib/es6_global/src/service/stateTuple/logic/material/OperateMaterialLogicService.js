

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../state/engine/LightMaterialEngineService.js";

function getNewMaterilaName(param) {
  return "New Material";
}

function getDefaultName(param) {
  return "NoName Material";
}

function _getName(material, engineState, getMaterialNameFunc) {
  var match = Curry._2(getMaterialNameFunc, material, engineState);
  if (match !== undefined) {
    return match;
  } else {
    return "NoName Material";
  }
}

function getName(material, type_, engineState) {
  if (type_) {
    return _getName(material, engineState, LightMaterialEngineService$WonderEditor.getLightMaterialName);
  } else {
    return _getName(material, engineState, BasicMaterialEngineService$WonderEditor.getBasicMaterialName);
  }
}

function setName(material, type_, name, engineState) {
  if (type_) {
    return LightMaterialEngineService$WonderEditor.setLightMaterialName(material, name, engineState);
  } else {
    return BasicMaterialEngineService$WonderEditor.setBasicMaterialName(material, name, engineState);
  }
}

export {
  getNewMaterilaName ,
  getDefaultName ,
  _getName ,
  getName ,
  setName ,
  
}
/* BasicMaterialEngineService-WonderEditor Not a pure module */
