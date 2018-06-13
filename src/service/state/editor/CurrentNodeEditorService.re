let clearCurrentNode = editorState =>
  editorState
  |> AssetCurrentNodeIdEditorService.clearCurrentNodeId
  |> SceneEditorService.clearCurrentSceneTreeNode;