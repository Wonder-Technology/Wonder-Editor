let importWDB =
    (
      (name, wdbArrayBuffer),
      (wdbNodeId, parentFolderNode),
      (editorState, engineState),
    ) =>
  WDBAssetLogicService.importAssetWDB(
    (name, wdbArrayBuffer),
    (wdbNodeId, parentFolderNode),
    false,
    (editorState, engineState),
  );