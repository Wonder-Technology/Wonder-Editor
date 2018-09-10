let _setIMGUIFunc = (editorState, engineState) =>
  ManageIMGUIEngineService.setIMGUIFunc(
    EditIMGUIFuncUtils.getEngineStateCustomData(editorState, engineState),
    EditIMGUIFuncUtils.getEngineStateIMGUIFunc(),
    engineState,
  );

let initEditorJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  let (editorState, engineState, editCamera) =
    engineState
    |> DefaultSceneUtils.prepareSpecificGameObjectsForEngineState(editorState);

  let (engineState, cubeGeometry) =
    engineState |> DefaultSceneUtils.prepareDefaultComponentForEngineState;
  let engineState =
    engineState
    |> DefaultSceneUtils.createDefaultSceneForEngineState(cubeGeometry);
  /* let editorState = DefaultSceneUtils.computeDiffValue(editorState); */

  editorState |> StateEditorService.setState |> ignore;

  engineState
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(editCamera)
  |. BasicCameraViewEngineService.activeBasicCameraView(engineState)
  |> _setIMGUIFunc(editorState);
};