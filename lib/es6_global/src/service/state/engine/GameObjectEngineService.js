

import * as TransformAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function setGameObjectName(name, gameObject, engineState) {
  return GameObjectAPI$Wonderjs.setGameObjectName(gameObject, name, engineState);
}

function _getChildren(parent, state) {
  return TransformAPI$Wonderjs.unsafeGetTransformChildren(parent, state).sort();
}

function getAllChildrenTransform(rootGameObject, state) {
  var _addChildren = function (parentArr, state, childrenArr) {
    var childrenArr$1 = childrenArr.concat(parentArr);
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, parent) {
                  var state = param[0];
                  return _addChildren(TransformAPI$Wonderjs.unsafeGetTransformChildren(parent, state).sort(), state, param[1]);
                }), /* tuple */[
                state,
                childrenArr$1
              ], parentArr);
  };
  var parent = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state);
  return _addChildren(TransformAPI$Wonderjs.unsafeGetTransformChildren(parent, state).sort(), state, /* array */[]);
}

function getAllGameObjects(rootGameObject, state) {
  var match = getAllChildrenTransform(rootGameObject, state);
  var state$1 = match[0];
  return /* array */[rootGameObject].concat(match[1].map((function (transform) {
                    return TransformAPI$Wonderjs.unsafeGetTransformGameObject(transform, state$1);
                  })));
}

var create = GameObjectAPI$Wonderjs.createGameObject;

var initGameObject = GameObjectAPI$Wonderjs.initGameObject;

var disposeGameObject = GameObjectAPI$Wonderjs.disposeGameObject;

var cloneGameObject = GameObjectAPI$Wonderjs.cloneGameObject;

var disposeGameObjectKeepOrder = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrder;

var disposeGameObjectKeepOrderRemoveGeometry = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrderRemoveGeometry;

var getGameObjectName = GameObjectAPI$Wonderjs.getGameObjectName;

var unsafeGetGameObjectName = GameObjectAPI$Wonderjs.unsafeGetGameObjectName;

export {
  create ,
  initGameObject ,
  disposeGameObject ,
  cloneGameObject ,
  disposeGameObjectKeepOrder ,
  disposeGameObjectKeepOrderRemoveGeometry ,
  getGameObjectName ,
  unsafeGetGameObjectName ,
  setGameObjectName ,
  _getChildren ,
  getAllChildrenTransform ,
  getAllGameObjects ,
  
}
/* TransformAPI-Wonderjs Not a pure module */
