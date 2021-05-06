'use strict';

var ArrayService$WonderEditor = require("../../src/service/atom/ArrayService.js");
var OptionService$WonderEditor = require("../../src/service/primitive/OptionService.js");
var SceneEngineService$WonderEditor = require("../../src/service/state/engine/SceneEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var InspectorEngineGameObjectLogicService$WonderEditor = require("../../src/service/stateTuple/logic/engine/InspectorEngineGameObjectLogicService.js");

function getSceneCameras(engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, engineState);
              }));
}

function unsafeGetSceneFirstCamera(engineState) {
  return ArrayService$WonderEditor.unsafeGetFirst(getSceneCameras(engineState));
}

function getSceneDirectionLights(engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getChildren(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent(gameObject, engineState);
              }));
}

function unsafeGetSceneFirstDirectionLight(engineState) {
  return ArrayService$WonderEditor.unsafeGetFirst(getSceneDirectionLights(engineState));
}

function getSceneAllChildren(engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getChildren(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState);
}

function getSceneEmptyGameObject(engineState) {
  return ArrayService$WonderEditor.unsafeGetLast(HierarchyGameObjectEngineService$WonderEditor.getChildren(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState));
}

function getMaterialSphereLightMaterial(editorState, engineState) {
  var materialSphere = OptionService$WonderEditor.unsafeGet(InspectorEngineGameObjectLogicService$WonderEditor.getMaterialSphere(/* tuple */[
            editorState,
            engineState
          ]));
  return OptionService$WonderEditor.unsafeGet(GameObjectComponentEngineService$WonderEditor.getLightMaterialComponent(materialSphere, engineState));
}

function getMaterialSphereBasicMaterial(editorState, engineState) {
  var materialSphere = OptionService$WonderEditor.unsafeGet(InspectorEngineGameObjectLogicService$WonderEditor.getMaterialSphere(/* tuple */[
            editorState,
            engineState
          ]));
  return OptionService$WonderEditor.unsafeGet(GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(materialSphere, engineState));
}

var getMaterialSphere = InspectorEngineGameObjectLogicService$WonderEditor.getMaterialSphere;

var getWDBGameObject = InspectorEngineGameObjectLogicService$WonderEditor.getWDBGameObject;

var disposeInspectorEngineContainerGameObjectAllChildren = InspectorEngineGameObjectLogicService$WonderEditor.disposeInspectorEngineContainerGameObjectAllChildren;

exports.getSceneCameras = getSceneCameras;
exports.unsafeGetSceneFirstCamera = unsafeGetSceneFirstCamera;
exports.getSceneDirectionLights = getSceneDirectionLights;
exports.unsafeGetSceneFirstDirectionLight = unsafeGetSceneFirstDirectionLight;
exports.getSceneAllChildren = getSceneAllChildren;
exports.getSceneEmptyGameObject = getSceneEmptyGameObject;
exports.getMaterialSphere = getMaterialSphere;
exports.getWDBGameObject = getWDBGameObject;
exports.disposeInspectorEngineContainerGameObjectAllChildren = disposeInspectorEngineContainerGameObjectAllChildren;
exports.getMaterialSphereLightMaterial = getMaterialSphereLightMaterial;
exports.getMaterialSphereBasicMaterial = getMaterialSphereBasicMaterial;
/* ArrayService-WonderEditor Not a pure module */
