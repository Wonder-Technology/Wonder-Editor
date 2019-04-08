let _addSceneGameObjectComponentTypeToMap = (engineState, editorState) =>
  editorState
  |> InspectorEditorService.addComponentTypeToMap(
       SceneEngineService.getSceneGameObject(engineState),
       InspectorComponentType.Transform,
     );

let initEditorJob = (_, engineState) => {
  let engineState =
    ScriptEventFunctionEngineService.disableScriptEventFunction(engineState);

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