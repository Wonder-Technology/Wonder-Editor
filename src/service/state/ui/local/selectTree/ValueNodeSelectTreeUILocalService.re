let setNodeData = (nodeId, nodeData, tree) =>
  OperateTreeSelectTreeService.updateNode(
    nodeId,
    nodeData,
    ValueNodeSelectTreeService.buildNodeByNodeData,
    tree,
  );