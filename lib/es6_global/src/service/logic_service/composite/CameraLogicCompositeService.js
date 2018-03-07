'use strict';

import * as MainEditorGameObjectAdaptor$WonderEditor        from "../../../core/component/mainEditor/logic/adaptor/MainEditorGameObjectAdaptor.js";
import * as TransformLogicSingleService$WonderEditor        from "../single/TransformLogicSingleService.js";
import * as GameObjectLogicSingleService$WonderEditor       from "../single/GameObjectLogicSingleService.js";
import * as CameraControllerLogicSingleService$WonderEditor from "../single/CameraControllerLogicSingleService.js";

function createCameraControllerPerspectiveCamera(state) {
  var match = CameraControllerLogicSingleService$WonderEditor.create(state);
  var cameraController = match[1];
  var state$1 = CameraControllerLogicSingleService$WonderEditor.setPerspectiveCameraAspect(cameraController, 1, CameraControllerLogicSingleService$WonderEditor.setPerspectiveCameraFovy(cameraController, 60, CameraControllerLogicSingleService$WonderEditor.setPerspectiveCameraFar(cameraController, 1000, CameraControllerLogicSingleService$WonderEditor.setPerspectiveCameraNear(cameraController, 0.1, match[0]))));
  var state$2 = CameraControllerLogicSingleService$WonderEditor.setPerspectiveCamera(cameraController, state$1);
  return /* tuple */[
          state$2,
          cameraController
        ];
}

function createCamera(state) {
  var match = createCameraControllerPerspectiveCamera(state);
  var match$1 = GameObjectLogicSingleService$WonderEditor.create(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectLogicSingleService$WonderEditor.addCameraControllerComponent(gameObject, match[1], match$1[0]);
  var transform = GameObjectLogicSingleService$WonderEditor.getTransformComponent(gameObject, state$1);
  var state$2 = TransformLogicSingleService$WonderEditor.setLocalPosition(transform, /* tuple */[
        0,
        0,
        40
      ], state$1);
  return /* tuple */[
          state$2,
          gameObject
        ];
}

var isCamera = MainEditorGameObjectAdaptor$WonderEditor.hasGameObjectCameraControllerComponent;

export {
  createCameraControllerPerspectiveCamera ,
  createCamera                            ,
  isCamera                                ,
  
}
/* MainEditorGameObjectAdaptor-WonderEditor Not a pure module */
