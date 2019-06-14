let setNodeData = (nodeId, nodeData, children, tree) =>
  OperateTreeSelectTreeService.updateNode(
    nodeId,
    nodeData,
    FolderNodeSelectTreeService.buildNodeByNodeData(~children),
    tree,
  );