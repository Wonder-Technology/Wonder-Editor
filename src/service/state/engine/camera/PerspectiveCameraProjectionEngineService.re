open Wonderjs;

let create = PerspectiveCameraProjectionAPI.createPerspectiveCameraProjection;

let computeAspect = engineState =>
  FrustumPerspectiveCameraProjectionMainService.computeAspect(engineState);

let getPerspectiveCameraProjectionGameObject = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraProjectionGameObject;

let getPerspectiveCameraNear = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear;

let setPerspectiveCameraNear = (value, component, engineState) =>
  PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionNear(
    component,
    value,
    engineState,
  );

let getPerspectiveCameraFar = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar;

let setPerspectiveCameraFar = (value, component, engineState) =>
  PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionFar(
    component,
    value,
    engineState,
  );

let unsafeGetPerspectiveCameraAspect = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraAspect;

let getPerspectiveCameraAspect = FrustumPerspectiveCameraProjectionMainService.getAspect;

let setPerspectiveCameraAspect = (value, component, engineState) =>
  PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionAspect(
    component,
    value,
    engineState,
  );

let removePerspectiveCameraAspect = (component, engineState) =>
  FrustumPerspectiveCameraProjectionMainService.removeAspect(
    component,
    engineState,
  );

let updatePerspectiveCameraProjection = engineState =>
  UpdatePerspectiveCameraProjectionMainService.update(engineState);

let getPerspectiveCameraFovy = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy;

let setPerspectiveCameraFovy = (value, component, engineState) =>
  PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionFovy(
    component,
    value,
    engineState,
  );

let getAllPerspectiveCameraProjections = PerspectiveCameraProjectionAPI.getAllPerspectiveCameraProjections;

let markPerspectiveCameraProjectionDirty = PerspectiveCameraProjectionAPI.markPerspectiveCameraProjectionDirty;

let markAllPerspectiveCameraProjectionsDirty = engineState =>
  engineState
  |> getAllPerspectiveCameraProjections
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, component) =>
         markPerspectiveCameraProjectionDirty(component, engineState),
       engineState,
     );

let markPerspectiveCameraProjectionNotDirty = PerspectiveCameraProjectionAPI.markPerspectiveCameraProjectionNotDirty;

let unsafeGetPerspectiveCameraProjectionPMatrix = PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraProjectionPMatrix;