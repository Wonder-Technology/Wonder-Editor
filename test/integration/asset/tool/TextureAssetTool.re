let getTextureContentIndex = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> TextureNodeAssetService.getTextureContentIndex;