

import * as ArrayService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/ArrayService.js";
import * as TransformAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function setGameObjectName(name, gameObject, engineState) {
  return GameObjectAPI$Wonderjs.setGameObjectName(gameObject, name, engineState);
}

function unsafeGetGameObjectChildren(gameObject, engineState) {
  return TransformAPI$Wonderjs.unsafeGetTransformChildren(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, engineState), engineState).map((function (transform) {
                return TransformAPI$Wonderjs.unsafeGetTransformGameObject(transform, engineState);
              }));
}

function getAllLightMaterialsExcludeTargetAndItsChildren(gameObject, targetGameObject, engineState) {
  var _iterate = function (targetGameObject, gameObjectArr, resultArr) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (resultArr, gameObject) {
                  var match = GameObjectAPI$Wonderjs.hasGameObjectLightMaterialComponent(gameObject, engineState);
                  return _iterate(targetGameObject, unsafeGetGameObjectChildren(gameObject, engineState), match ? ArrayService$Wonderjs.push(GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(gameObject, engineState), resultArr) : resultArr);
                }), resultArr, gameObjectArr.filter((function (gameObject) {
                      return gameObject !== targetGameObject;
                    })));
  };
  return _iterate(targetGameObject, /* array */[gameObject], /* array */[]);
}

var create = GameObjectAPI$Wonderjs.createGameObject;

var initGameObject = GameObjectAPI$Wonderjs.initGameObject;

var disposeGameObject = GameObjectAPI$Wonderjs.disposeGameObject;

var disposeGameObjectBasicMaterialComponent = GameObjectAPI$Wonderjs.disposeGameObjectBasicMaterialComponent;

var disposeGameObjectLightMaterialComponent = GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent;

var disposeGameObjectKeepOrder = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrder;

var unsafeGetGameObjectName = GameObjectAPI$Wonderjs.unsafeGetGameObjectName;

export {
  create ,
  initGameObject ,
  disposeGameObject ,
  disposeGameObjectBasicMaterialComponent ,
  disposeGameObjectLightMaterialComponent ,
  disposeGameObjectKeepOrder ,
  unsafeGetGameObjectName ,
  setGameObjectName ,
  unsafeGetGameObjectChildren ,
  getAllLightMaterialsExcludeTargetAndItsChildren ,
  
}
/* ArrayService-Wonderjs Not a pure module */
