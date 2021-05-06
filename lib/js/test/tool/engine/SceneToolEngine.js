'use strict';

var SceneEngineService$WonderEditor = require("../../../src/service/state/engine/SceneEngineService.js");
var GameObjectToolEngine$WonderEditor = require("./GameObjectToolEngine.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");

function getSceneAllBasicCameraViews(engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (gameObject) {
                  return GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, engineState);
                })).map((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(gameObject, engineState);
              }));
}

function findGameObjectByName(name, engineState) {
  return GameObjectToolEngine$WonderEditor.findGameObjectByName(name, SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState);
}

exports.getSceneAllBasicCameraViews = getSceneAllBasicCameraViews;
exports.findGameObjectByName = findGameObjectByName;
/* SceneEngineService-WonderEditor Not a pure module */
