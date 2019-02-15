let _addSceneGameObjectComponentTypeToMap = (engineState, editorState) =>
  editorState
  |> InspectorEditorService.addComponentTypeToMap(
       SceneEngineService.getSceneGameObject(engineState),
       InspectorComponentType.Transform,
     );

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
         GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
           sceneCamera,
           engineState,
         ),
       );

  let editorState =
    editorState |> _addSceneGameObjectComponentTypeToMap(engineState);

  editorState |> StateEditorService.setState |> ignore;

  engineState
  |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
       editCamera,
     )
  |. BasicCameraViewEngineService.activeBasicCameraView(engineState);
};