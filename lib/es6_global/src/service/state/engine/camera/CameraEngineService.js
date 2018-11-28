

import * as GameObjectLogicService$WonderEditor from "../../../stateTuple/logic/GameObjectLogicService.js";
import * as GameObjectEngineService$WonderEditor from "../GameObjectEngineService.js";
import * as CameraGroupEngineService$WonderEditor from "../CameraGroupEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "./BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../GameObjectComponentEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "./PerspectiveCameraProjectionEngineService.js";

function createPerspectiveCamera(engineState) {
  var match = PerspectiveCameraProjectionEngineService$WonderEditor.create(engineState);
  var cameraProjection = match[1];
  var engineState$1 = PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFovy(60, cameraProjection, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFar(50000, cameraProjection, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraNear(0.01, cameraProjection, match[0])));
  return /* tuple */[
          engineState$1,
          cameraProjection
        ];
}

function createCameraGroup(engineState) {
  return CameraGroupEngineService$WonderEditor.createCameraGroup(/* tuple */[
              BasicCameraViewEngineService$WonderEditor.create,
              createPerspectiveCamera
            ], engineState);
}

function createCamera(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var gameObject = match$1[1];
  var match$2 = createCameraGroup(match$1[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("Camera", gameObject, match$2[0]);
  var match$3 = GameObjectLogicService$WonderEditor.addCameraGroup(gameObject, match$2[1], /* tuple */[
        match[0],
        engineState$1
      ]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          gameObject
        ];
}

function hasCameraGroup(gameObject, engineState) {
  return CameraGroupEngineService$WonderEditor.hasCameraGroupComponents(gameObject, /* tuple */[
              GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent,
              GameObjectComponentEngineService$WonderEditor.hasPerspectiveCameraProjectionComponent
            ], engineState);
}

export {
  createPerspectiveCamera ,
  createCameraGroup ,
  createCamera ,
  hasCameraGroup ,
  
}
/* GameObjectLogicService-WonderEditor Not a pure module */
