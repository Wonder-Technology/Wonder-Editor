let importWDB =
    (
      (imageDataIndexMap, snapshot, name, wdbArrayBuffer),
      (wdbNodeId, parentFolderNode),
      (editorState, engineState),
    ) =>
  WDBAssetLogicService.importAssetWDB(
    (name, wdbArrayBuffer),
    (wdbNodeId, parentFolderNode, false),
    WDBAssetLogicService.createWDBNodeUseImageDataMapSnapshot((
      imageDataIndexMap,
      snapshot,
    )),
    (editorState, engineState),
  );