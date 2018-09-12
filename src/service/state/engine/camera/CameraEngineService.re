let createPerspectiveCamera = engineState => {
  open PerspectiveCameraProjectionEngineService;
  let (engineState, cameraProjection) = create(engineState);
  let engineState =
    engineState
    |> setPerspectiveCameraNear(0.1, cameraProjection)
    |> setPerspectiveCameraFar(1000., cameraProjection)
    |> setPerspectiveCameraFovy(60., cameraProjection);

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
    |> GameObjectLogicService.addCameraGroup(
         gameObject,
         cameraComponentRecord,
       );

  (editorState, engineState, gameObject);
};

let hasCameraGroup = (gameObject, engineState) =>
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
  |> ArrayService.unsafeGetFirst;

let _bindEventIfInRunMode = (gameObject, lastBasicCameraView, engineState) =>
  SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
    engineState
    |> ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponent(
         gameObject,
       )
    |> ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponent(
         BasicCameraViewEngineService.getBasicCameraViewGameObject(
           lastBasicCameraView,
           engineState,
         ),
       ) :
    engineState;

let _setLastCameraToBeActiveAndBindEvent =
    (gameObject, targetRemoveBasicCameraView, engineState) => {
  let lastBasicCameraView =
    engineState
    |> GameObjectComponentEngineService.getAllBasicCameraViewComponents
    |> Js.Array.filter(component => component != targetRemoveBasicCameraView)
    |> ArrayService.unsafeGetLast;

  engineState
  |> _bindEventIfInRunMode(gameObject, lastBasicCameraView)
  |> BasicCameraViewEngineService.activeBasicCameraView(lastBasicCameraView);
};

let prepareForRemoveCameraGroup = (gameObject, engineState) => {
  let targetRemoveBasicCameraView =
    engineState
    |> GameObjectComponentEngineService.getBasicCameraViewComponent(
         gameObject,
       );

  BasicCameraViewEngineService.isActiveBasicCameraView(
    targetRemoveBasicCameraView,
    engineState,
  ) ?
    _setLastCameraToBeActiveAndBindEvent(
      gameObject,
      targetRemoveBasicCameraView,
      engineState,
    ) :
    engineState;
};