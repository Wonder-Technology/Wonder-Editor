

import * as TransformEngineService$WonderEditor from "../TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";

function getPosition(gameObject, engineState) {
  return TransformEngineService$WonderEditor.getPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
}

function getLocalPosition(gameObject, engineState) {
  return TransformEngineService$WonderEditor.getLocalPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
}

function setLocalPosition(gameObject, pos, engineState) {
  return TransformEngineService$WonderEditor.setLocalPosition(pos, GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
}

function getLocalScale(gameObject, engineState) {
  return TransformEngineService$WonderEditor.getLocalScale(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
}

function setLocalScale(gameObject, scale, engineState) {
  return TransformEngineService$WonderEditor.setLocalScale(scale, GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
}

function getLocalToWorldMatrixTypeArray(gameObject, engineState) {
  return TransformEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
}

export {
  getPosition ,
  getLocalPosition ,
  setLocalPosition ,
  getLocalScale ,
  setLocalScale ,
  getLocalToWorldMatrixTypeArray ,
  
}
/* TransformEngineService-WonderEditor Not a pure module */
