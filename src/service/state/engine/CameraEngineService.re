let createPerspectiveCamera = (engineState) => {
  open PerspectiveCameraProjectionEngineService;
  let (engineState, cameraProjection) = create(engineState);
  let engineState =
    engineState
    |> setPerspectiveCameraNear(cameraProjection, 0.1)
    |> setPerspectiveCameraFar(cameraProjection, 1000.)
    |> setPerspectiveCameraFovy(cameraProjection, 60.)
    |> setPerspectiveCameraAspect(cameraProjection, 1.);
  /* let engineState = engineState |> setPerspectiveCamera(cameraProjection); */
  (engineState, cameraProjection)
};

let createCamera = (engineState) => {
  open TransformEngineService;
  let (engineState, cameraView) = BasicCameraViewEngineService.create(engineState);
  let (engineState, cameraProjection) = createPerspectiveCamera(engineState);
  let (engineState, gameObject) = engineState |> GameObjectEngineService.create;
  let engineState =
    engineState
    |> GameObjectComponentEngineService.addBasicCameraViewComponent(gameObject, cameraView)
    |> GameObjectComponentEngineService.addPerspectiveCameraProjectionComponent(
         gameObject,
         cameraProjection
       );
  let transform = GameObjectComponentEngineService.getTransformComponent(gameObject, engineState);
  let engineState = engineState |> setLocalPosition(transform, (0., 0., 40.));
  (engineState, gameObject)
};

let isCamera = GameObjectComponentEngineService.hasBasicCameraViewComponent;