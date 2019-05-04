let setNodeData = (nodeId, nodeData, children, uiState) =>
  NodeSelectTreeUIService.setNodeData(
    nodeId,
    nodeData,
    FolderNodeSelectTreeService.buildNodeByNodeData(~children),
    uiState,
  );