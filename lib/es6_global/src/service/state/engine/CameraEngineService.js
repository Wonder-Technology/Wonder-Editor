

import * as GameObjectLogicService$WonderEditor from "../../stateTuple/logic/GameObjectLogicService.js";
import * as GameObjectEngineService$WonderEditor from "./GameObjectEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "./BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "./PerspectiveCameraProjectionEngineService.js";

function createPerspectiveCamera(engineState) {
  var match = PerspectiveCameraProjectionEngineService$WonderEditor.create(engineState);
  var cameraProjection = match[1];
  var engineState$1 = PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraAspect(cameraProjection, 1, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFovy(cameraProjection, 60, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFar(cameraProjection, 1000, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraNear(cameraProjection, 0.1, match[0]))));
  return /* tuple */[
          engineState$1,
          cameraProjection
        ];
}

function createCameraComponent(engineState) {
  var match = BasicCameraViewEngineService$WonderEditor.create(engineState);
  var match$1 = createPerspectiveCamera(match[0]);
  return /* tuple */[
          match$1[0],
          /* record */[
            /* basicCameraView */match[1],
            /* perspectiveCameraProjection */match$1[1]
          ]
        ];
}

function createCamera(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var gameObject = match$1[1];
  var match$2 = createCameraComponent(match$1[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("camera", gameObject, match$2[0]);
  var match$3 = GameObjectLogicService$WonderEditor.addCameraComponent(gameObject, match$2[1], /* tuple */[
        match[0],
        engineState$1
      ]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          gameObject
        ];
}

function hasCameraComponent(gameObject, engineState) {
  if (GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, engineState)) {
    return GameObjectComponentEngineService$WonderEditor.hasPerspectiveCameraProjectionComponent(gameObject, engineState);
  } else {
    return false;
  }
}

export {
  createPerspectiveCamera ,
  createCameraComponent ,
  createCamera ,
  hasCameraComponent ,
  
}
/* GameObjectLogicService-WonderEditor Not a pure module */
