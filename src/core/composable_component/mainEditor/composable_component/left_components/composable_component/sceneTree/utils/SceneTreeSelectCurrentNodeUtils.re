let clearCurrentData = editorState =>
  editorState
  |> CurrentNodeIdAssetEditorService.clearCurrentNodeId
  |> CurrentSelectSourceEditorService.clearCurrentSelectSource
  |> SceneTreeEditorService.clearCurrentSceneTreeNode;