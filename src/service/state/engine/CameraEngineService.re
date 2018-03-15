let createCameraControllerPerspectiveCamera = (engineState) => {
  open CameraControllerEngineService;
  let (engineState, cameraController) = create(engineState);
  let engineState =
    engineState
    |> setPerspectiveCameraNear(cameraController, 0.1)
    |> setPerspectiveCameraFar(cameraController, 1000.)
    |> setPerspectiveCameraFovy(cameraController, 60.)
    |> setPerspectiveCameraAspect(cameraController, 1.);
  let engineState = engineState |> setPerspectiveCamera(cameraController);
  (engineState, cameraController)
};

let createCamera = (engineState) => {
  open TransformEngineService;
  let (engineState, cameraController) = createCameraControllerPerspectiveCamera(engineState);
  let (engineState, gameObject) = engineState |> GameObjectEngineService.create;
  let engineState =
    engineState
    |> GameObjectComponentEngineService.addCameraControllerComponent(gameObject, cameraController);
  let transform = GameObjectComponentEngineService.getTransformComponent(gameObject, engineState);
  let engineState = engineState |> setLocalPosition(transform, (0., 0., 40.));
  (engineState, gameObject)
};

let isCamera = GameObjectComponentEngineService.hasCameraControllerComponent;