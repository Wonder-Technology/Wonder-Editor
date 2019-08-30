let unsafeGetId = (nodeId, editorState) =>
  IMGUICustomImageTextureContentMapAssetEditorService.unsafeGetId(
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
    |> TextureNodeAssetService.unsafeGetTextureContentIndex,
    editorState,
  );