let prepareSpecificGameObjects = (editorState, engineState) => {
  let (engineState, gridPlane) =
    GeometryEngineService.createGridPlaneGameObject(
      (300., 1., 0.),
      [|0.6, 0.6, 0.6|],
      engineState,
    );
  let (editorState, engineState, camera) =
    CameraLogicService.createCamera(editorState, engineState);
  let (engineState, arcballCameraController) =
    ArcballCameraEngineService.create(engineState);

  let engineState =
    engineState
    |> ArcballCameraEngineService.setArcballCameraControllerDistance(
         20.,
         arcballCameraController,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerWheelSpeed(
         arcballCameraController,
         0.5,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerMoveSpeedX(
         arcballCameraController,
         1.,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerMoveSpeedY(
         arcballCameraController,
         1.,
       )
    |> ArcballCameraEngineService.setArcballCameraControllerTheta(
         arcballCameraController,
         Js.Math._PI /. 5.,
       )
    |> ArcballCameraControllerLogicService.bindArcballCameraControllerEventForSceneView(
         arcballCameraController,
       );

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addArcballCameraController(
         camera,
         arcballCameraController,
       );

  let editorState =
    editorState
    |> SceneViewEditorService.setGridPlane(gridPlane)
    |> SceneViewEditorService.setEditCamera(camera);

  (editorState, engineState, camera);
};

let initEditorWithArcballCamera = (_, engineState) => {
  let engineState =
    ScriptEventFunctionEngineService.disableScriptEventFunction(engineState);

  let editorState = StateEditorService.getState();

  let (editorState, engineState, editCamera) =
    prepareSpecificGameObjects(editorState, engineState);

  let (editorState, engineState, cubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponent(editorState, engineState);

  let (editorState, engineState, sceneCamera) =
    DefaultSceneUtils.createDefaultScene(
      cubeGeometry,
      editorState,
      engineState,
    );

  let editorState =
    editorState
    |> GameViewEditorService.setActivedBasicCameraView(
         GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
           sceneCamera,
           engineState,
         ),
       );

  editorState
  |> InspectorEditorService.addSceneGameObjectComponentTypeToMap(
       SceneEngineService.getSceneGameObject(engineState),
     )
  |> StateEditorService.setState
  |> ignore;

  engineState
  |> BasicCameraViewEngineService.activeBasicCameraView(
       engineState
       |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
            editCamera,
          ),
     );
};