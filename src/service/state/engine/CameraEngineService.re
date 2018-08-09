let createPerspectiveCamera = engineState => {
  open PerspectiveCameraProjectionEngineService;
  let (engineState, cameraProjection) = create(engineState);
  let engineState =
    engineState
    |> setPerspectiveCameraNear(0.1, cameraProjection)
    |> setPerspectiveCameraFar(1000., cameraProjection)
    |> setPerspectiveCameraFovy(60., cameraProjection)
    |> setPerspectiveCameraAspect(1., cameraProjection);
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
  |> ArrayService.getFirst;

let hasUnActiveCameraGroupAndSetCurrentCamera = (gameObject, runEngineState) => {
  let targetBasicCameraView =
    runEngineState
    |> GameObjectComponentEngineService.getBasicCameraViewComponent(
         gameObject,
       );

  BasicCameraViewEngineService.isActiveBasicCameraView(
    targetBasicCameraView,
    runEngineState,
  ) ?
    {
      let currentBasicCameraView =
        runEngineState
        |> GameObjectComponentEngineService.getAllBasicCameraViewComponents
        |> Js.Array.filter(component => component != targetBasicCameraView)
        |> ArrayService.getLast;

      let runEngineState =
        SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
          runEngineState
          |> ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponent(
               gameObject,
             )
          |> ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponent(
               BasicCameraViewEngineService.getBasicCameraViewGameObject(
                 currentBasicCameraView,
                 runEngineState,
               ),
             ) :
          runEngineState;

      runEngineState
      |> BasicCameraViewEngineService.activeBasicCameraView(
           currentBasicCameraView,
         );
    } :
    runEngineState;
};