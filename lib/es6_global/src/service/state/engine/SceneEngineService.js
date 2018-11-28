

import * as SceneAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/SceneAPI.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as CameraEngineService$WonderEditor from "./camera/CameraEngineService.js";
import * as PrimitiveEngineService$WonderEditor from "./PrimitiveEngineService.js";
import * as GameObjectEngineService$WonderEditor from "./GameObjectEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "./LightMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";

function createDefaultSceneGameObjects(componentData, editorState, engineState) {
  var match = PrimitiveEngineService$WonderEditor.createCube(componentData, editorState, engineState);
  var match$1 = PrimitiveEngineService$WonderEditor.createCube(componentData, match[0], match[1]);
  var match$2 = PrimitiveEngineService$WonderEditor.createDirectionLight(match$1[0], match$1[1]);
  var match$3 = CameraEngineService$WonderEditor.createCamera(match$2[0], match$2[1]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          match$3[2],
          match[2],
          match$1[2],
          match$2[2]
        ];
}

function disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial(engineState) {
  var scene = SceneAPI$Wonderjs.getSceneGameObject(engineState);
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return GameObjectEngineService$WonderEditor.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(gameObject, engineState);
              }), engineState, GameObjectEngineService$WonderEditor.getAllGameObjects(scene, engineState).slice(1));
}

function getSceneActiveBasicCameraView(engineState) {
  return GameObjectEngineService$WonderEditor.getGameObjectActiveBasicCameraView(SceneAPI$Wonderjs.getSceneGameObject(engineState), engineState);
}

function getSceneAllLightMaterials(engineState) {
  return GameObjectEngineService$WonderEditor.getAllLightMaterials(GameObjectEngineService$WonderEditor.getAllGameObjects(SceneAPI$Wonderjs.getSceneGameObject(engineState), engineState), engineState);
}

function clearShaderCacheAndReInitSceneAllLightMaterials(engineState) {
  return LightMaterialEngineService$WonderEditor.reInitAllLightMaterialsAndClearShaderCache(getSceneAllLightMaterials(engineState), engineState);
}

function doesNeedReInitSceneAllLightMaterials(gameObjects, engineState) {
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
  createDefaultSceneGameObjects ,
  getAmbientLightColor ,
  setAmbientLightColor ,
  getSceneGameObject ,
  addSceneChild ,
  addSceneChildren ,
  setSceneGameObject ,
  disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial ,
  getSceneActiveBasicCameraView ,
  getSceneAllLightMaterials ,
  clearShaderCacheAndReInitSceneAllLightMaterials ,
  doesNeedReInitSceneAllLightMaterials ,
  
}
/* SceneAPI-Wonderjs Not a pure module */
