

import * as UpdateArcballCameraControllerMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/camera_controller/arcball/UpdateArcballCameraControllerMainService.js";
import * as UpdatePerspectiveCameraProjectionMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/perspective_camera_projection/UpdatePerspectiveCameraProjectionMainService.js";

function updateJob(_, engineState) {
  return UpdateArcballCameraControllerMainService$Wonderjs.updateAll(UpdatePerspectiveCameraProjectionMainService$Wonderjs.update(engineState));
}

export {
  updateJob ,
  
}
/* UpdateArcballCameraControllerMainService-Wonderjs Not a pure module */
