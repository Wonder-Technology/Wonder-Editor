

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as LightMaterialEngineService$WonderEditor from "../../state/engine/LightMaterialEngineService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../state/engine/BasicSourceTextureEngineService.js";

function getDefaultName(param) {
  return "NoName Texture";
}

function getName(texture, engineState) {
  var match = BasicSourceTextureEngineService$WonderEditor.getBasicSourceTextureName(texture, engineState);
  if (match !== undefined) {
    return match;
  } else {
    return "NoName Texture";
  }
}

function setName(texture, name, engineState) {
  return BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(name, texture, engineState);
}

function changeTextureMapAndRefreshEngineState(material, textureComponent, setMapFunc, engineState) {
  return StateLogicService$WonderEditor.refreshEngineStateAndReturnEngineState(Curry._3(setMapFunc, textureComponent, material, engineState));
}

function _handleMapAndUpdateShaderAndRefreshEngineState(material, param, engineState) {
  return StateLogicService$WonderEditor.refreshEngineStateAndReturnEngineState(Curry._2(param[1], /* array */[material], Curry._2(param[0], material, engineState)));
}

function handleMaterialComponentFromNoMapToHasMap(param, param$1, engineState) {
  return _handleMapAndUpdateShaderAndRefreshEngineState(param[0], /* tuple */[
              Curry._1(param$1[0], param[1]),
              param$1[1]
            ], engineState);
}

function handleMaterialComponentFromHasMapToNoMap(material, param, engineState) {
  return _handleMapAndUpdateShaderAndRefreshEngineState(material, /* tuple */[
              param[0],
              param[1]
            ], engineState);
}

function handleLightMaterialComponentFromHasDiffuseMapToNoMap(material, engineState) {
  return handleMaterialComponentFromHasMapToNoMap(material, /* tuple */[
              LightMaterialEngineService$WonderEditor.removeLightMaterialDiffuseMap,
              LightMaterialEngineService$WonderEditor.reInitLightMaterialsAndClearShaderCache
            ], engineState);
}

export {
  getDefaultName ,
  getName ,
  setName ,
  changeTextureMapAndRefreshEngineState ,
  _handleMapAndUpdateShaderAndRefreshEngineState ,
  handleMaterialComponentFromNoMapToHasMap ,
  handleMaterialComponentFromHasMapToNoMap ,
  handleLightMaterialComponentFromHasDiffuseMapToNoMap ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
