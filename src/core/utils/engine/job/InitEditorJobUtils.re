let initEditorJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  let (editorState, engineState, editCamera) =
    engineState
    |> DefaultSceneUtils.prepareSpecificGameObjectsForEngineState(editorState);

  let (engineState, cubeGeometry) =
    engineState |> DefaultSceneUtils.prepareDefaultComponentForEngineState;
  let (engineState, sceneCamera) =
    engineState
    |> DefaultSceneUtils.createDefaultSceneForEngineState(cubeGeometry);
  /* let editorState = DefaultSceneUtils.computeDiffValue(editorState); */

  let editorState =
    editorState
    |> GameViewEditorService.setActivedBasicCameraView(
         GameObjectComponentEngineService.getBasicCameraViewComponent(
           sceneCamera,
           engineState,
         ),
       );

  editorState |> StateEditorService.setState |> ignore;

  engineState
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(editCamera)
  |. BasicCameraViewEngineService.activeBasicCameraView(engineState);
};