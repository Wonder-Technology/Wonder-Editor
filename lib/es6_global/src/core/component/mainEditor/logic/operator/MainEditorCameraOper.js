'use strict';

import * as MainEditorTransformAdaptor$WonderEditor        from "../adaptor/MainEditorTransformAdaptor.js";
import * as MainEditorGameObjectAdaptor$WonderEditor       from "../adaptor/MainEditorGameObjectAdaptor.js";
import * as MainEditorCameraControllerAdaptor$WonderEditor from "../adaptor/MainEditorCameraControllerAdaptor.js";

function createCameraControllerPerspectiveCamera(state) {
  var match = MainEditorCameraControllerAdaptor$WonderEditor.create(state);
  var cameraController = match[1];
  var state$1 = MainEditorCameraControllerAdaptor$WonderEditor.setPerspectiveCameraAspect(cameraController, 1, MainEditorCameraControllerAdaptor$WonderEditor.setPerspectiveCameraFovy(cameraController, 60, MainEditorCameraControllerAdaptor$WonderEditor.setPerspectiveCameraFar(cameraController, 1000, MainEditorCameraControllerAdaptor$WonderEditor.setPerspectiveCameraNear(cameraController, 0.1, match[0]))));
  var state$2 = MainEditorCameraControllerAdaptor$WonderEditor.setPerspectiveCamera(cameraController, state$1);
  return /* tuple */[
          state$2,
          cameraController
        ];
}

function createCamera(state) {
  var match = createCameraControllerPerspectiveCamera(state);
  var match$1 = MainEditorGameObjectAdaptor$WonderEditor.create(match[0]);
  var gameObject = match$1[1];
  var state$1 = MainEditorGameObjectAdaptor$WonderEditor.addCameraControllerComponent(gameObject, match[1], match$1[0]);
  var transform = MainEditorGameObjectAdaptor$WonderEditor.getTransformComponent(gameObject, state$1);
  var state$2 = MainEditorTransformAdaptor$WonderEditor.setLocalPosition(transform, /* tuple */[
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
/* MainEditorTransformAdaptor-WonderEditor Not a pure module */
