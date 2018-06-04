

import * as TransformEngineService$WonderEditor from "../../service/state/engine/TransformEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../service/state/engine/GameObjectEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../service/state/engine/GameObjectComponentEngineService.js";

function setParentKeepOrder(parent, child, engineState) {
  return TransformEngineService$WonderEditor.setParentKeepOrder(GameObjectComponentEngineService$WonderEditor.getTransformComponent(parent, engineState), GameObjectComponentEngineService$WonderEditor.getTransformComponent(child, engineState), engineState);
}

function getParent(child, engineState) {
  return TransformEngineService$WonderEditor.getParent(GameObjectComponentEngineService$WonderEditor.getTransformComponent(child, engineState), engineState);
}

function addChild(parent, child, engineState) {
  return TransformEngineService$WonderEditor.setParent(GameObjectComponentEngineService$WonderEditor.getTransformComponent(parent, engineState), GameObjectComponentEngineService$WonderEditor.getTransformComponent(child, engineState), engineState);
}

function getChildren(gameObject, engineState) {
  return TransformEngineService$WonderEditor.getChildren(GameObjectComponentEngineService$WonderEditor.getTransformComponent(gameObject, engineState), engineState).map((function (transform) {
                return TransformEngineService$WonderEditor.getGameObjectByTransform(transform, engineState);
              }));
}

function hasChildren(gameObject, engineState) {
  return getChildren(gameObject, engineState).length > 0;
}

function disposeGameObjectChildren(gameObject, engineEngineState) {
  return getChildren(gameObject, engineEngineState).reduce((function (engineEngineState, gameObject) {
                return GameObjectEngineService$WonderEditor.disposeGameObject(gameObject, engineEngineState);
              }), engineEngineState);
}

export {
  setParentKeepOrder ,
  getParent ,
  addChild ,
  getChildren ,
  hasChildren ,
  disposeGameObjectChildren ,
  
}
/* TransformEngineService-WonderEditor Not a pure module */
