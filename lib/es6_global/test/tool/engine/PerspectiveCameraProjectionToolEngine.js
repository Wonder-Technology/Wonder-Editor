

import * as Matrix4Service$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Matrix4Service.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "../../../src/service/state/engine/camera/PerspectiveCameraProjectionEngineService.js";

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

export {
  buildPerspective ,
  setDefaultAspect ,
  setAllCameraProjectionsDefaultAspect ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
