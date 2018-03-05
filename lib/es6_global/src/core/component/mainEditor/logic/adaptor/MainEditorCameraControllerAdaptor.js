'use strict';

import * as CameraController$Wonderjs  from "../../../../../../../../node_modules/wonder.js/lib/es6_global/src/ecs/component/api/cameraController/CameraController.js";
import * as PerspectiveCamera$Wonderjs from "../../../../../../../../node_modules/wonder.js/lib/es6_global/src/ecs/component/api/cameraController/PerspectiveCamera.js";

var create = CameraController$Wonderjs.createCameraController;

var setPerspectiveCameraNear = PerspectiveCamera$Wonderjs.setPerspectiveCameraNear;

var setPerspectiveCameraFar = PerspectiveCamera$Wonderjs.setPerspectiveCameraFar;

var setPerspectiveCameraAspect = PerspectiveCamera$Wonderjs.setPerspectiveCameraAspect;

var setPerspectiveCameraFovy = PerspectiveCamera$Wonderjs.setPerspectiveCameraFovy;

var setPerspectiveCamera = CameraController$Wonderjs.setCameraControllerPerspectiveCamera;

export {
  create                     ,
  setPerspectiveCameraNear   ,
  setPerspectiveCameraFar    ,
  setPerspectiveCameraAspect ,
  setPerspectiveCameraFovy   ,
  setPerspectiveCamera       ,
  
}
/* CameraController-Wonderjs Not a pure module */
