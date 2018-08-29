

import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/camera/PerspectiveCameraProjectionAPI.js";

function setPerspectiveCameraNear(value, component, state) {
  return PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(component, value, state);
}

function setPerspectiveCameraFar(value, component, state) {
  return PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(component, value, state);
}

function setPerspectiveCameraAspect(value, component, state) {
  return PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(component, value, state);
}

function setPerspectiveCameraFovy(value, component, state) {
  return PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFovy(component, value, state);
}

var create = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection;

var getPerspectiveCameraProjectionGameObject = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionGameObject;

var getPerspectiveCameraNear = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraNear;

var getPerspectiveCameraFar = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFar;

var getPerspectiveCameraAspect = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraAspect;

var getPerspectiveCameraFovy = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFovy;

export {
  create ,
  getPerspectiveCameraProjectionGameObject ,
  getPerspectiveCameraNear ,
  setPerspectiveCameraNear ,
  getPerspectiveCameraFar ,
  setPerspectiveCameraFar ,
  getPerspectiveCameraAspect ,
  setPerspectiveCameraAspect ,
  getPerspectiveCameraFovy ,
  setPerspectiveCameraFovy ,
  
}
/* PerspectiveCameraProjectionAPI-Wonderjs Not a pure module */
