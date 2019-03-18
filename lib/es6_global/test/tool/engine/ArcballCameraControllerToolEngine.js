

import * as GameObjectAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as CameraToolEngine$WonderEditor from "./CameraToolEngine.js";
import * as ArcballCameraControllerAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/camera_controller/ArcballCameraControllerAPI.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectComponentEngineService.js";

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

export {
  createGameObject ,
  addGameObjectArcballCameraControllerComponent ,
  addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
