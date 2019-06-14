let handleGLBType =
    (
      (fileName, glbArrayBuffer),
      (wdbNodeId, selectedFolderNodeInAssetTree),
      (editorState, engineState),
    ) =>
  AssetHeaderHandleWDBUtils.handleAssetWDBType(
    (fileName, ConverterEngineService.convertGLBToWDB(glbArrayBuffer)),
    (wdbNodeId, selectedFolderNodeInAssetTree),
    (editorState, engineState),
  );