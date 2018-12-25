let getRootNode = editorState =>
  RootTreeAssetService.getRootNode(
    TreeAssetEditorService.unsafeGetTree(editorState),
  );