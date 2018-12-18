

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as LightMaterialEngineService$WonderEditor from "../../state/engine/LightMaterialEngineService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../state/engine/BasicSourceTextureEngineService.js";

function getNoNameTextureName(param) {
  return "NoName Texture";
}

function getTextureBaseNameByTextureComponent(texture, engineState) {
  var match = BasicSourceTextureEngineService$WonderEditor.getBasicSourceTextureName(texture, engineState);
  if (match !== undefined) {
    return match;
  } else {
    return "NoName Texture";
  }
}

function getTextureBaseName(currentNodeId, textureNodeMap) {
  var partial_arg = SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, textureNodeMap)[/* textureComponent */0];
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return getTextureBaseNameByTextureComponent(partial_arg, param);
              }));
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
              LightMaterialEngineService$WonderEditor.reInitAllLightMaterialsAndClearShaderCache
            ], engineState);
}

export {
  getNoNameTextureName ,
  getTextureBaseNameByTextureComponent ,
  getTextureBaseName ,
  changeTextureMapAndRefreshEngineState ,
  _handleMapAndUpdateShaderAndRefreshEngineState ,
  handleMaterialComponentFromNoMapToHasMap ,
  handleMaterialComponentFromHasMapToNoMap ,
  handleLightMaterialComponentFromHasDiffuseMapToNoMap ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
