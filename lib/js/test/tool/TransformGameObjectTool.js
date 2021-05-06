'use strict';

var Vector3Service$WonderEditor = require("../../src/service/primitive/Vector3Service.js");
var TransformEngineService$WonderEditor = require("../../src/service/state/engine/TransformEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

function getLocalEulerAngles(gameObject, engineState) {
  return Vector3Service$WonderEditor.truncate(5, TransformEngineService$WonderEditor.getLocalEulerAngles(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState));
}

function setLocalEulerAngles(gameObject, localEulerAngles, engineState) {
  return TransformEngineService$WonderEditor.setLocalEulerAngles(localEulerAngles, GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
}

function getEulerAngles(gameObject, engineState) {
  return Vector3Service$WonderEditor.truncate(5, TransformEngineService$WonderEditor.getEulerAngles(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState));
}

function getLocalScale(gameObject, engineState) {
  return Vector3Service$WonderEditor.truncate(5, TransformEngineService$WonderEditor.getLocalScale(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState));
}

function setLocalScale(gameObject, localScale, engineState) {
  return TransformEngineService$WonderEditor.setLocalScale(localScale, GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
}

function setPosition(gameObject, pos, engineState) {
  return TransformEngineService$WonderEditor.setPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), pos, engineState);
}

function setLocalRotation(gameObject, localRotation, engineState) {
  return TransformEngineService$WonderEditor.setLocalRotation(localRotation, GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
}

exports.getLocalEulerAngles = getLocalEulerAngles;
exports.setLocalEulerAngles = setLocalEulerAngles;
exports.getEulerAngles = getEulerAngles;
exports.getLocalScale = getLocalScale;
exports.setLocalScale = setLocalScale;
exports.setPosition = setPosition;
exports.setLocalRotation = setLocalRotation;
/* Vector3Service-WonderEditor Not a pure module */
