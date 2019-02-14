

import * as SceneAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/SceneAPI.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectEngineService$WonderEditor from "./gameObject/GameObjectEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "./LightMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "./gameObject/HierarchyGameObjectEngineService.js";

function isSceneGameObject(gameObject, engineState) {
  return gameObject === SceneAPI$Wonderjs.getSceneGameObject(engineState);
}

function disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial(engineState) {
  var scene = SceneAPI$Wonderjs.getSceneGameObject(engineState);
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return GameObjectEngineService$WonderEditor.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(gameObject, engineState);
              }), engineState, HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(scene, engineState).slice(1));
}

function getSceneActiveBasicCameraView(engineState) {
  return GameObjectEngineService$WonderEditor.getGameObjectActiveBasicCameraView(SceneAPI$Wonderjs.getSceneGameObject(engineState), engineState);
}

function getSceneAllLightMaterials(engineState) {
  return GameObjectEngineService$WonderEditor.getAllLightMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneAPI$Wonderjs.getSceneGameObject(engineState), engineState), engineState);
}

function clearShaderCacheAndReInitSceneAllLightMaterials(engineState) {
  return LightMaterialEngineService$WonderEditor.reInitAllLightMaterialsAndClearShaderCache(getSceneAllLightMaterials(engineState), engineState);
}

function isNeedReInitSceneAllLightMaterials(gameObjects, engineState) {
  return gameObjects.filter((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.hasLightComponent(gameObject, engineState);
              })).length > 0;
}

var getAmbientLightColor = SceneAPI$Wonderjs.getAmbientLightColor;

var setAmbientLightColor = SceneAPI$Wonderjs.setAmbientLightColor;

var getSceneGameObject = SceneAPI$Wonderjs.getSceneGameObject;

var addSceneChild = SceneAPI$Wonderjs.addSceneChild;

var addSceneChildren = SceneAPI$Wonderjs.addSceneChildren;

var setSceneGameObject = SceneAPI$Wonderjs.setSceneGameObject;

export {
  getAmbientLightColor ,
  setAmbientLightColor ,
  getSceneGameObject ,
  addSceneChild ,
  addSceneChildren ,
  setSceneGameObject ,
  isSceneGameObject ,
  disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial ,
  getSceneActiveBasicCameraView ,
  getSceneAllLightMaterials ,
  clearShaderCacheAndReInitSceneAllLightMaterials ,
  isNeedReInitSceneAllLightMaterials ,
  
}
/* SceneAPI-Wonderjs Not a pure module */
