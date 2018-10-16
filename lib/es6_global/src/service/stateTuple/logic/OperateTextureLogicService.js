

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../state/engine/LightMaterialEngineService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../state/engine/BasicSourceTextureEngineService.js";

function getTextureBaseName(currentNodeId, textureNodeMap) {
  var partial_arg = SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, textureNodeMap)[/* textureIndex */0];
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(partial_arg, param);
              }));
}

function renameTextureToEngine(texture, newName) {
  return StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                return BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(newName, texture, param);
              }));
}

function changeTextureMapAndRefreshEngineState(material, textureIndex, setMapFunc, engineState) {
  return StateLogicService$WonderEditor.refreshEngineStateAndReturnEngineState(Curry._3(setMapFunc, textureIndex, material, engineState));
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

function handleBasicMaterialComponentFromHasMapToNoMap(material, engineState) {
  return handleMaterialComponentFromHasMapToNoMap(material, /* tuple */[
              BasicMaterialEngineService$WonderEditor.removeBasicMaterialMap,
              BasicMaterialEngineService$WonderEditor.reInitAllBasicMaterialsAndClearShaderCache
            ], engineState);
}

function handleLightMaterialComponentFromHasDiffuseMapToNoMap(material, engineState) {
  return handleMaterialComponentFromHasMapToNoMap(material, /* tuple */[
              LightMaterialEngineService$WonderEditor.removeLightMaterialDiffuseMap,
              LightMaterialEngineService$WonderEditor.reInitAllLightMaterialsAndClearShaderCache
            ], engineState);
}

export {
  getTextureBaseName ,
  renameTextureToEngine ,
  changeTextureMapAndRefreshEngineState ,
  _handleMapAndUpdateShaderAndRefreshEngineState ,
  handleMaterialComponentFromNoMapToHasMap ,
  handleMaterialComponentFromHasMapToNoMap ,
  handleBasicMaterialComponentFromHasMapToNoMap ,
  handleLightMaterialComponentFromHasDiffuseMapToNoMap ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
