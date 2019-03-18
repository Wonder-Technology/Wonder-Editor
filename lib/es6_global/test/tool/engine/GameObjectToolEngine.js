

import * as GameObjectAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AliveGameObjectMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/gameObject/AliveGameObjectMainService.js";
import * as GameObjectEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectComponentEngineService.js";

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

function getAllArcballCameraControllers(gameObject, engineState) {
  return GameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState).filter((function (gameObject) {
                  return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(gameObject, engineState);
                })).map((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(gameObject, engineState);
              }));
}

function getAllPointLightGameObjects(gameObject, engineState) {
  return GameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState).filter((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.hasPointLightComponent(gameObject, engineState);
              }));
}

function disposeAllGameObjects(gameObject, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return GameObjectEngineService$WonderEditor.disposeGameObject(gameObject, engineState);
              }), engineState, GameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState));
}

var isAlive = AliveGameObjectMainService$Wonderjs.isAlive;

export {
  createGameObject ,
  getAllArcballCameraControllers ,
  getAllPointLightGameObjects ,
  disposeAllGameObjects ,
  isAlive ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
