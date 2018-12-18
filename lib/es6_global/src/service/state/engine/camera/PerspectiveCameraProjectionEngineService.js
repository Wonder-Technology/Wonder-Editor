

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as UpdatePerspectiveCameraProjectionMainService$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/perspective_camera_projection/UpdatePerspectiveCameraProjectionMainService.js";
import * as FrustumPerspectiveCameraProjectionMainService$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/perspective_camera_projection/FrustumPerspectiveCameraProjectionMainService.js";

var computeAspect = FrustumPerspectiveCameraProjectionMainService$Wonderjs.computeAspect;

function setPerspectiveCameraNear(value, component, engineState) {
  return PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(component, value, engineState);
}

function setPerspectiveCameraFar(value, component, engineState) {
  return PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(component, value, engineState);
}

function setPerspectiveCameraAspect(value, component, engineState) {
  return PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(component, value, engineState);
}

var removePerspectiveCameraAspect = FrustumPerspectiveCameraProjectionMainService$Wonderjs.removeAspect;

var updatePerspectiveCameraProjection = UpdatePerspectiveCameraProjectionMainService$Wonderjs.update;

function setPerspectiveCameraFovy(value, component, engineState) {
  return PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFovy(component, value, engineState);
}

function markAllPerspectiveCameraProjectionsDirty(engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, component) {
                return PerspectiveCameraProjectionAPI$Wonderjs.markPerspectiveCameraProjectionDirty(component, engineState);
              }), engineState, PerspectiveCameraProjectionAPI$Wonderjs.getAllPerspectiveCameraProjections(engineState));
}

var create = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection;

var getPerspectiveCameraProjectionGameObject = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionGameObject;

var getPerspectiveCameraNear = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraNear;

var getPerspectiveCameraFar = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFar;

var unsafeGetPerspectiveCameraAspect = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraAspect;

var getPerspectiveCameraAspect = FrustumPerspectiveCameraProjectionMainService$Wonderjs.getAspect;

var getPerspectiveCameraFovy = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFovy;

var getAllPerspectiveCameraProjections = PerspectiveCameraProjectionAPI$Wonderjs.getAllPerspectiveCameraProjections;

var markPerspectiveCameraProjectionDirty = PerspectiveCameraProjectionAPI$Wonderjs.markPerspectiveCameraProjectionDirty;

var markPerspectiveCameraProjectionNotDirty = PerspectiveCameraProjectionAPI$Wonderjs.markPerspectiveCameraProjectionNotDirty;

export {
  create ,
  computeAspect ,
  getPerspectiveCameraProjectionGameObject ,
  getPerspectiveCameraNear ,
  setPerspectiveCameraNear ,
  getPerspectiveCameraFar ,
  setPerspectiveCameraFar ,
  unsafeGetPerspectiveCameraAspect ,
  getPerspectiveCameraAspect ,
  setPerspectiveCameraAspect ,
  removePerspectiveCameraAspect ,
  updatePerspectiveCameraProjection ,
  getPerspectiveCameraFovy ,
  setPerspectiveCameraFovy ,
  getAllPerspectiveCameraProjections ,
  markPerspectiveCameraProjectionDirty ,
  markAllPerspectiveCameraProjectionsDirty ,
  markPerspectiveCameraProjectionNotDirty ,
  
}
/* PerspectiveCameraProjectionAPI-Wonderjs Not a pure module */
