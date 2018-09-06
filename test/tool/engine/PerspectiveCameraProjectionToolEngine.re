open Wonderjs;

open StateDataMainType;

open PerspectiveCameraProjectionType;

let buildPerspective = (fovy, aspect, near, far) => {
  let pMatrix = Matrix4Service.createIdentityMatrix4();

  Matrix4Service.buildPerspective((fovy, aspect, near, far), pMatrix)
  |> ignore;

  pMatrix;
};

let setDefaultAspect = (cameraProjection, state) =>
  PerspectiveCameraProjectionEngineService.setPerspectiveCameraAspect(
    1.,
    cameraProjection,
    state,
  );

let setAllCameraProjectionsDefaultAspect = state =>
  PerspectiveCameraProjectionEngineService.getAllPerspectiveCameraProjections(
    state,
  )
  |>WonderLog.Log.print
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, cameraProjection) =>
         setDefaultAspect(cameraProjection, state),
       state,
     );