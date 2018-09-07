open Wonderjs;

let createBasicCameraViewPerspectiveCamera = state => {
  open BasicCameraViewAPI;
  open PerspectiveCameraProjectionAPI;
  let (state, perspectiveCameraProjection) =
    createPerspectiveCameraProjection(state);
  let (state, basicCameraView) = createBasicCameraView(state);
  let state =
    state
    |> setPerspectiveCameraProjectionNear(perspectiveCameraProjection, 0.1)
    |> setPerspectiveCameraProjectionFar(perspectiveCameraProjection, 1000.)
    |> setPerspectiveCameraProjectionFovy(perspectiveCameraProjection, 60.)
    |> setPerspectiveCameraProjectionAspect(perspectiveCameraProjection, 1.);
  (state, basicCameraView, perspectiveCameraProjection);
};

let createCameraGameObject = state => {
  open GameObjectAPI;
  open BasicCameraViewAPI;
  let (state, basicCameraView, perspectiveCameraProjection) =
    createBasicCameraViewPerspectiveCamera(state);
  let (state, gameObject) = state |> GameObjectAPI.createGameObject;
  let state =
    state
    |> addGameObjectBasicCameraViewComponent(gameObject, basicCameraView);
  let state =
    state
    |> addGameObjectPerspectiveCameraProjectionComponent(
         gameObject,
         perspectiveCameraProjection,
       );

  let state =
    BasicCameraViewAPI.activeBasicCameraView(basicCameraView, state);

  (
    state,
    gameObject,
    GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state),
    (basicCameraView, perspectiveCameraProjection),
  );
};