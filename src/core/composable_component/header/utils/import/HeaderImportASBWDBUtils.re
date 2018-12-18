let importWDB =
    (
      (name, wdbArrayBuffer),
      (wdbNodeId, parentFolderNodeId),
      (editorState, engineState),
    ) =>
  AssetWDBUtils.importAssetWDB(
    (name, wdbArrayBuffer),
    (wdbNodeId, parentFolderNodeId),
    false,
    (editorState, engineState),
  );