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

let createCameraGroup = engineState =>
  engineState
  |> CameraGroupEngineService.createCameraGroup((
       BasicCameraViewEngineService.create,
       createPerspectiveCamera,
     ));

let createCamera = (editorState, engineState) => {
  let (editorState, (engineState, gameObject)) =
    GameObjectLogicService.createGameObject((editorState, engineState));
  let (engineState, cameraComponentRecord) = createCameraGroup(engineState);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("camera", gameObject);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addCameraGroupComponent(
         gameObject,
         cameraComponentRecord,
       );

  (editorState, engineState, gameObject);
};

let hasCameraComponent = (gameObject, engineState) =>
  engineState
  |> CameraGroupEngineService.hasCameraGroupComponents(
       gameObject,
       (
         GameObjectComponentEngineService.hasBasicCameraViewComponent,
         GameObjectComponentEngineService.hasPerspectiveCameraProjectionComponent,
       ),
     );

let getEditEngineStateEditCamera = editEngineState =>
  GameObjectComponentEngineService.getAllBasicCameraViewComponents(
    editEngineState,
  )
  |> Js.Array.map(basicCameraView =>
       BasicCameraViewEngineService.getBasicCameraViewGameObject(
         basicCameraView,
         editEngineState,
       )
     )
  |> ArrayService.getFirst;

let hasUnActiveCameraGroupAndSetCurrentCamera = (gameObject, engineState) => {
  let basicCameraView =
    engineState
    |> GameObjectComponentEngineService.getBasicCameraViewComponent(
         gameObject,
       );

  BasicCameraViewEngineService.isActiveBasicCameraView(
    basicCameraView,
    engineState,
  ) ?
    engineState
    |> GameObjectComponentEngineService.getAllBasicCameraViewComponents
    |> Js.Array.filter(component => component != basicCameraView)
    |> ArrayService.getLast
    |> (
      basicCameraView =>
        engineState
        |> BasicCameraViewEngineService.activeBasicCameraView(basicCameraView)
    ) :
    engineState;
};