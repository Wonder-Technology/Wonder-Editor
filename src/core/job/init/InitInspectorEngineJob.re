let initInspectorEngineJob = (_, inspectorEngineState) => {
  let editorState = StateEditorService.getState();
  let (emptyGameObject, inspectorEngineState) =
    inspectorEngineState |> DefaultSceneInspectorEngineUtils.createDefaultScene;

  editorState
  |> ParentGameObjectInspectorCanvasEditorService.setParentGameObject(
       emptyGameObject,
     )
  |> StateEditorService.setState;

  inspectorEngineState;
};