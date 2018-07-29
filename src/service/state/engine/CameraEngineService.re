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

let createCamera = (editorState, engineState) => {
  let (editorState, (engineState, gameObject)) =
    GameObjectLogicService.createGameObject((editorState, engineState));
  let (engineState, cameraView) =
    BasicCameraViewEngineService.create(engineState);
  let (engineState, cameraProjection) = createPerspectiveCamera(engineState);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("camera", gameObject);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addBasicCameraViewComponent(
         gameObject,
         cameraView,
       )
    |> GameObjectLogicService.addPerspectiveCameraProjectionComponent(
         gameObject,
         cameraProjection,
       );
  (editorState, engineState, gameObject);
};

let isCamera = GameObjectComponentEngineService.hasBasicCameraViewComponent;