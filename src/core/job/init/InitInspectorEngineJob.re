let initInspectorEngineJob = (_, inspectorEngineState) => {
  let editorState = StateEditorService.getState();
  let (emptyGameObject, inspectorEngineState) =
    inspectorEngineState |> DefaultSceneInspectorEngineUtils.createDefaultScene;

  editorState
  |> ContainerGameObjectInspectorCanvasEditorService.setContainerGameObject(
       emptyGameObject,
     )
  |> StateEditorService.setState;

  inspectorEngineState;
};