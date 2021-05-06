'use strict';

var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var CameraControllerUtils$WonderEditor = require("../../../../../src/core/utils/engine/CameraControllerUtils.js");

function startLoopForCameraChangeDirection(engineState) {
  return CameraControllerUtils$WonderEditor.loopBodyWhenCameraChangeDirectionAndStop(StateEditorService$WonderEditor.getState(/* () */0), engineState);
}

exports.startLoopForCameraChangeDirection = startLoopForCameraChangeDirection;
/* StateEditorService-WonderEditor Not a pure module */
