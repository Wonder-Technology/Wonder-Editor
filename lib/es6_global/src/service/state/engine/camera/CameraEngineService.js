

import * as CameraGroupEngineService$WonderEditor from "../CameraGroupEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "./BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../gameObject/GameObjectComponentEngineService.js";
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

function hasCameraGroup(gameObject, engineState) {
  return CameraGroupEngineService$WonderEditor.hasCameraGroupComponents(gameObject, /* tuple */[
              GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent,
              GameObjectComponentEngineService$WonderEditor.hasPerspectiveCameraProjectionComponent
            ], engineState);
}

export {
  createPerspectiveCamera ,
  createCameraGroup ,
  hasCameraGroup ,
  
}
/* BasicCameraViewEngineService-WonderEditor Not a pure module */
