'use strict';

import * as GameObject$Wonderjs                           from "../../../../../../node_modules/wonder.js/lib/es6_global/src/ecs/admin/api/GameObject.js";
import * as TransformEngineService$WonderEditor           from "./TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";

function addChild(parent, child, state) {
  return TransformEngineService$WonderEditor.setParent(GameObjectComponentEngineService$WonderEditor.getTransformComponent(parent, state), GameObjectComponentEngineService$WonderEditor.getTransformComponent(child, state), state);
}

function getChildren(gameObject, state) {
  return TransformEngineService$WonderEditor.getChildren(GameObjectComponentEngineService$WonderEditor.getTransformComponent(gameObject, state), state).map((function (transform) {
                return TransformEngineService$WonderEditor.getGameObjectByTransform(transform, state);
              }));
}

function hasChildren(gameObject, state) {
  return +(getChildren(gameObject, state).length > 0);
}

function disposeGameObjectChildren(gameObject, engineState) {
  return getChildren(gameObject, engineState).reduce((function (engineState, gameObject) {
                return GameObject$Wonderjs.disposeGameObject(gameObject, engineState);
              }), engineState);
}

function _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, dragedGameObject, engineState) {
  var _targetTransform = GameObjectComponentEngineService$WonderEditor.getTransformComponent(targetGameObject, engineState);
  var dragedTransform = GameObjectComponentEngineService$WonderEditor.getTransformComponent(dragedGameObject, engineState);
  var engineState$1 = engineState;
  while(true) {
    var targetTransform = _targetTransform;
    var match = TransformEngineService$WonderEditor.getParent(targetTransform, engineState$1);
    if (match == null) {
      return /* false */0;
    } else {
      var match$1 = +(match === dragedTransform);
      if (match$1 !== 0) {
        return /* true */1;
      } else {
        _targetTransform = match;
        continue ;
        
      }
    }
  };
}

function isGameObjectRelationError(targetGameObject, dragedGameObject, param) {
  var match = +(targetGameObject === dragedGameObject);
  if (match !== 0) {
    return /* true */1;
  } else {
    return _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, dragedGameObject, param[1]);
  }
}

var create = GameObject$Wonderjs.createGameObject;

var initGameObject = GameObject$Wonderjs.initGameObject;

var disposeGameObject = GameObject$Wonderjs.disposeGameObject;

export {
  create                                      ,
  initGameObject                              ,
  disposeGameObject                           ,
  addChild                                    ,
  getChildren                                 ,
  hasChildren                                 ,
  disposeGameObjectChildren                   ,
  _isDragedGameObjectBeTargetGameObjectParent ,
  isGameObjectRelationError                   ,
  
}
/* GameObject-Wonderjs Not a pure module */
