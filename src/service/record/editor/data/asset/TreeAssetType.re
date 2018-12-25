open NodeAssetType;

type tree =
  | TextureNode(nodeId, textureNodeData)
  | MaterialNode(nodeId, materialNodeData)
  | WDBNode(nodeId, wdbNodeData)
  | FolderNode(
      nodeId,
      folderNodeData,
      UIStateAssetType.uiState(array(tree)),
    );