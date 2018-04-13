'use strict';

import * as GameObjectEngineService$WonderEditor                  from "./GameObjectEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor             from "./BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor         from "./GameObjectComponentEngineService.js";
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

function createCamera(engineState) {
  var match = BasicCameraViewEngineService$WonderEditor.create(engineState);
  var match$1 = createPerspectiveCamera(match[0]);
  var match$2 = GameObjectEngineService$WonderEditor.create(match$1[0]);
  var gameObject = match$2[1];
  var engineState$1 = GameObjectComponentEngineService$WonderEditor.addPerspectiveCameraProjectionComponent(gameObject, match$1[1], GameObjectComponentEngineService$WonderEditor.addBasicCameraViewComponent(gameObject, match[1], match$2[0]));
  return /* tuple */[
          engineState$1,
          gameObject
        ];
}

var isCamera = GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent;

export {
  createPerspectiveCamera ,
  createCamera            ,
  isCamera                ,
  
}
/* GameObjectEngineService-WonderEditor Not a pure module */
