'use strict';

var GameObjectAPI$Wonderjs = require("wonder.js/lib/js/src/api/GameObjectAPI.js");
var CameraToolEngine$WonderEditor = require("./CameraToolEngine.js");
var ArcballCameraControllerAPI$Wonderjs = require("wonder.js/lib/js/src/api/camera_controller/ArcballCameraControllerAPI.js");
var ArcballCameraEngineService$WonderEditor = require("../../../src/service/state/engine/ArcballCameraEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

function createGameObject(state) {
  var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state);
  var cameraController = match[1];
  var match$1 = CameraToolEngine$WonderEditor.createCameraGameObject(match[0]);
  var match$2 = match$1[3];
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectArcballCameraControllerComponent(gameObject, cameraController, match$1[0]);
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

function addGameObjectArcballCameraControllerComponent(gameObject, engineState) {
  var match = ArcballCameraEngineService$WonderEditor.create(engineState);
  var cameraController = match[1];
  var engineState$1 = GameObjectComponentEngineService$WonderEditor.addArcballCameraControllerComponent(gameObject, cameraController, match[0]);
  return /* tuple */[
          engineState$1,
          gameObject,
          cameraController
        ];
}

function addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView(gameObject, engineState) {
  var match = addGameObjectArcballCameraControllerComponent(gameObject, engineState);
  var cameraController = match[2];
  var engineState$1 = ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventForGameView(cameraController, match[0]);
  return /* tuple */[
          engineState$1,
          match[1],
          cameraController
        ];
}

exports.createGameObject = createGameObject;
exports.addGameObjectArcballCameraControllerComponent = addGameObjectArcballCameraControllerComponent;
exports.addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView = addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView;
/* GameObjectAPI-Wonderjs Not a pure module */
