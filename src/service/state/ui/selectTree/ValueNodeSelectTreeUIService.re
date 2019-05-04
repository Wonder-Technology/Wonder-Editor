let setNodeData = (nodeId, nodeData, uiState) =>
  NodeSelectTreeUIService.setNodeData(
    nodeId,
    nodeData,
    ValueNodeSelectTreeService.buildNodeByNodeData,
    uiState,
  );