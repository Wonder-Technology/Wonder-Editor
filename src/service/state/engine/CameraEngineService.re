let _createPerspectiveCamera = engineState => {
  open PerspectiveCameraProjectionEngineService;
  let (engineState, cameraProjection) = create(engineState);
  let engineState =
    engineState
    |> setPerspectiveCameraNear(cameraProjection, 0.1)
    |> setPerspectiveCameraFar(cameraProjection, 1000.)
    |> setPerspectiveCameraFovy(cameraProjection, 60.)
    |> setPerspectiveCameraAspect(cameraProjection, 1.);
  (engineState, cameraProjection);
};

let createCamera = engineState => {
  let (engineState, cameraView) =
    BasicCameraViewEngineService.create(engineState);
  let (engineState, cameraProjection) = _createPerspectiveCamera(engineState);
  let (engineState, gameObject) =
    engineState |> GameObjectEngineService.create;
  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("camera", gameObject)
    |> GameObjectComponentEngineService.addBasicCameraViewComponent(
         gameObject,
         cameraView,
       )
    |> GameObjectComponentEngineService.addPerspectiveCameraProjectionComponent(
         gameObject,
         cameraProjection,
       );
  (engineState, gameObject);
};

let isCamera = GameObjectComponentEngineService.hasBasicCameraViewComponent;