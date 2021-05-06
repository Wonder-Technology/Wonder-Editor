'use strict';

var Matrix4Service$Wonderjs = require("wonder.js/lib/js/src/service/atom/Matrix4Service.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");
var PerspectiveCameraProjectionEngineService$WonderEditor = require("../../../src/service/state/engine/camera/PerspectiveCameraProjectionEngineService.js");

function buildPerspective(fovy, aspect, near, far) {
  var pMatrix = Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0);
  Matrix4Service$Wonderjs.buildPerspective(/* tuple */[
        fovy,
        aspect,
        near,
        far
      ], pMatrix);
  return pMatrix;
}

function setDefaultAspect(cameraProjection, state) {
  return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraAspect(1, cameraProjection, state);
}

function setAllCameraProjectionsDefaultAspect(state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, cameraProjection) {
                return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraAspect(1, cameraProjection, state);
              }), state, PerspectiveCameraProjectionEngineService$WonderEditor.getAllPerspectiveCameraProjections(state));
}

exports.buildPerspective = buildPerspective;
exports.setDefaultAspect = setDefaultAspect;
exports.setAllCameraProjectionsDefaultAspect = setAllCameraProjectionsDefaultAspect;
/* Matrix4Service-Wonderjs Not a pure module */
