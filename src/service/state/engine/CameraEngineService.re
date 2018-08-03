open CameraComponentType;

let createPerspectiveCamera = engineState => {
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

let createCameraComponent = engineState => {
  let (engineState, cameraView) =
    BasicCameraViewEngineService.create(engineState);
  let (engineState, cameraProjection) = createPerspectiveCamera(engineState);

  (
    engineState,
    {
      basicCameraView: cameraView,
      perspectiveCameraProjection: cameraProjection,
    },
  );
};

let createCamera = (editorState, engineState) => {
  let (editorState, (engineState, gameObject)) =
    GameObjectLogicService.createGameObject((editorState, engineState));
  let (engineState, cameraComponentRecord) =
    createCameraComponent(engineState);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("camera", gameObject);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addCameraComponent(
         gameObject,
         cameraComponentRecord,
       );

  (editorState, engineState, gameObject);
};

let hasCameraComponent = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasBasicCameraViewComponent(
    gameObject,
    engineState,
  )
  && GameObjectComponentEngineService.hasPerspectiveCameraProjectionComponent(
       gameObject,
       engineState,
     );

