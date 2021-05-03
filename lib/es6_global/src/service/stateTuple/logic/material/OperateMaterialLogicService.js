

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ImageDataAssetService$WonderEditor from "../../../record/editor/asset/ImageDataAssetService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../state/engine/LightMaterialEngineService.js";

function getDefaultSnapshotBase64(param) {
  return ImageDataAssetService$WonderEditor.getBase64ForWhiteImage(/* () */0);
}

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
    return LightMaterialEngineService$WonderEditor.setLightMaterialName(name, material, engineState);
  } else {
    return BasicMaterialEngineService$WonderEditor.setBasicMaterialName(name, material, engineState);
  }
}

export {
  getDefaultSnapshotBase64 ,
  getNewMaterilaName ,
  getDefaultName ,
  _getName ,
  getName ,
  setName ,
  
}
/* ImageDataAssetService-WonderEditor Not a pure module */
