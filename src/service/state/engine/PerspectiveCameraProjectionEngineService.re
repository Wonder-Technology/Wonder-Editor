open Wonderjs;

let create = PerspectiveCameraProjectionAPI.createPerspectiveCameraProjection;

let getPerspectiveCameraProjectionGameObject = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraProjectionGameObject;

let getPerspectiveCameraNear = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear;

let setPerspectiveCameraNear = (value, component, state) =>
  PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionNear(
    component,
    value,
    state,
  );

let getPerspectiveCameraFar = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar;

let setPerspectiveCameraFar = (value, component, state) =>
  PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionFar(
    component,
    value,
    state,
  );

let getPerspectiveCameraAspect = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraAspect;

let setPerspectiveCameraAspect = (value, component, state) =>
  PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionAspect(
    component,
    value,
    state,
  );

let getPerspectiveCameraFovy = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy;

let setPerspectiveCameraFovy = (value, component, state) =>
  PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionFovy(
    component,
    value,
    state,
  );