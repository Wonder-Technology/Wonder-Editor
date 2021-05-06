'use strict';

var GameObjectAPI$Wonderjs = require("wonder.js/lib/js/src/api/GameObjectAPI.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");
var AliveGameObjectMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/gameObject/AliveGameObjectMainService.js");
var GameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");

function createGameObject(state) {
  var match = GameObjectAPI$Wonderjs.createGameObject(state);
  var gameObject = match[1];
  var state$1 = match[0];
  return /* tuple */[
          state$1,
          gameObject,
          GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1)
        ];
}

function getAllFlyCameraControllers(gameObject, engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState).filter((function (gameObject) {
                  return GameObjectComponentEngineService$WonderEditor.hasFlyCameraControllerComponent(gameObject, engineState);
                })).map((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetFlyCameraControllerComponent(gameObject, engineState);
              }));
}

function getAllArcballCameraControllers(gameObject, engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState).filter((function (gameObject) {
                  return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(gameObject, engineState);
                })).map((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(gameObject, engineState);
              }));
}

function getAllPointLightGameObjects(gameObject, engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState).filter((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.hasPointLightComponent(gameObject, engineState);
              }));
}

function disposeAllGameObjects(gameObject, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return GameObjectEngineService$WonderEditor.disposeGameObject(gameObject, engineState);
              }), engineState, HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState));
}

function findGameObjectByName(name, parentGameObject, engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(parentGameObject, engineState).filter((function (gameObject) {
                var match = GameObjectEngineService$WonderEditor.getGameObjectName(gameObject, engineState);
                if (match !== undefined) {
                  return match === name;
                } else {
                  return false;
                }
              }));
}

var isAlive = AliveGameObjectMainService$Wonderjs.isAlive;

exports.createGameObject = createGameObject;
exports.getAllFlyCameraControllers = getAllFlyCameraControllers;
exports.getAllArcballCameraControllers = getAllArcballCameraControllers;
exports.getAllPointLightGameObjects = getAllPointLightGameObjects;
exports.disposeAllGameObjects = disposeAllGameObjects;
exports.isAlive = isAlive;
exports.findGameObjectByName = findGameObjectByName;
/* GameObjectAPI-Wonderjs Not a pure module */
