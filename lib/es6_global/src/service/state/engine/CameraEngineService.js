'use strict';

import * as TransformEngineService$WonderEditor           from "./TransformEngineService.js";
import * as GameObjectEngineService$WonderEditor          from "./GameObjectEngineService.js";
import * as CameraControllerEngineService$WonderEditor    from "./CameraControllerEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";

function createCameraControllerPerspectiveCamera(engineState) {
  var match = CameraControllerEngineService$WonderEditor.create(engineState);
  var cameraController = match[1];
  var engineState$1 = CameraControllerEngineService$WonderEditor.setPerspectiveCameraAspect(cameraController, 1, CameraControllerEngineService$WonderEditor.setPerspectiveCameraFovy(cameraController, 60, CameraControllerEngineService$WonderEditor.setPerspectiveCameraFar(cameraController, 1000, CameraControllerEngineService$WonderEditor.setPerspectiveCameraNear(cameraController, 0.1, match[0]))));
  var engineState$2 = CameraControllerEngineService$WonderEditor.setPerspectiveCamera(cameraController, engineState$1);
  return /* tuple */[
          engineState$2,
          cameraController
        ];
}

function createCamera(engineState) {
  var match = createCameraControllerPerspectiveCamera(engineState);
  var match$1 = GameObjectEngineService$WonderEditor.create(match[0]);
  var gameObject = match$1[1];
  var engineState$1 = GameObjectComponentEngineService$WonderEditor.addCameraControllerComponent(gameObject, match[1], match$1[0]);
  var transform = GameObjectComponentEngineService$WonderEditor.getTransformComponent(gameObject, engineState$1);
  var engineState$2 = TransformEngineService$WonderEditor.setLocalPosition(transform, /* tuple */[
        0,
        0,
        40
      ], engineState$1);
  return /* tuple */[
          engineState$2,
          gameObject
        ];
}

var isCamera = GameObjectComponentEngineService$WonderEditor.hasCameraControllerComponent;

export {
  createCameraControllerPerspectiveCamera ,
  createCamera                            ,
  isCamera                                ,
  
}
/* TransformEngineService-WonderEditor Not a pure module */
