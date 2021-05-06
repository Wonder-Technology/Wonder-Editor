'use strict';

var GameObjectAPI$Wonderjs = require("wonder.js/lib/js/src/api/GameObjectAPI.js");
var CameraToolEngine$WonderEditor = require("./CameraToolEngine.js");
var FlyCameraControllerAPI$Wonderjs = require("wonder.js/lib/js/src/api/camera_controller/FlyCameraControllerAPI.js");
var FlyCameraEngineService$WonderEditor = require("../../../src/service/state/engine/FlyCameraEngineService.js");
var OperateFlyCameraControllerService$Wonderjs = require("wonder.js/lib/js/src/service/record/main/camera_controller/fly/OperateFlyCameraControllerService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

function unsafeGetTranslationDiff(cameraController, state) {
  return OperateFlyCameraControllerService$Wonderjs.unsafeGetTranslationDiff(cameraController, state[/* flyCameraControllerRecord */26]);
}

function setTranslationDiff(cameraController, value, state) {
  return OperateFlyCameraControllerService$Wonderjs.setTranslationDiff(cameraController, value, state[/* flyCameraControllerRecord */26]);
}

function unsafeGetEulerAngleDiff(cameraController, state) {
  return OperateFlyCameraControllerService$Wonderjs.unsafeGetEulerAngleDiff(cameraController, state[/* flyCameraControllerRecord */26]);
}

function setEulerAngleDiff(cameraController, value, state) {
  return OperateFlyCameraControllerService$Wonderjs.setEulerAngleDiff(cameraController, value, state[/* flyCameraControllerRecord */26]);
}

function createGameObject(state) {
  var match = FlyCameraControllerAPI$Wonderjs.createFlyCameraController(state);
  var cameraController = match[1];
  var match$1 = CameraToolEngine$WonderEditor.createCameraGameObject(match[0]);
  var match$2 = match$1[3];
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectFlyCameraControllerComponent(gameObject, cameraController, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          match$1[2],
          /* tuple */[
            cameraController,
            match$2[0],
            match$2[1]
          ]
        ];
}

function addGameObjectFlyCameraControllerComponent(gameObject, engineState) {
  var match = FlyCameraEngineService$WonderEditor.create(engineState);
  var cameraController = match[1];
  var engineState$1 = GameObjectComponentEngineService$WonderEditor.addFlyCameraControllerComponent(gameObject, cameraController, match[0]);
  return /* tuple */[
          engineState$1,
          gameObject,
          cameraController
        ];
}

function addGameObjectFlyCameraControllerComponentAndBindFlyCameraControllerEventForGameView(gameObject, engineState) {
  var match = addGameObjectFlyCameraControllerComponent(gameObject, engineState);
  var cameraController = match[2];
  var engineState$1 = FlyCameraEngineService$WonderEditor.bindFlyCameraControllerEventForGameView(cameraController, match[0]);
  return /* tuple */[
          engineState$1,
          match[1],
          cameraController
        ];
}

exports.unsafeGetTranslationDiff = unsafeGetTranslationDiff;
exports.setTranslationDiff = setTranslationDiff;
exports.unsafeGetEulerAngleDiff = unsafeGetEulerAngleDiff;
exports.setEulerAngleDiff = setEulerAngleDiff;
exports.createGameObject = createGameObject;
exports.addGameObjectFlyCameraControllerComponent = addGameObjectFlyCameraControllerComponent;
exports.addGameObjectFlyCameraControllerComponentAndBindFlyCameraControllerEventForGameView = addGameObjectFlyCameraControllerComponentAndBindFlyCameraControllerEventForGameView;
/* GameObjectAPI-Wonderjs Not a pure module */
