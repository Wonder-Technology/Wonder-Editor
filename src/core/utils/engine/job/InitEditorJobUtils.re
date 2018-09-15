let initEditorJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  let (editorState, engineState, editCamera) =
    DefaultSceneUtils.prepareSpecificGameObjects(editorState, engineState);

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