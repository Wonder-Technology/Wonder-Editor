let setNodeData = (nodeId, nodeData, buildNodeByNodeDataFunc, uiState) =>
  TreeSelectTreeUIService.unsafeGetTree(uiState)
  |> OperateTreeSelectTreeService.updateNode(
       nodeId,
       nodeData,
       buildNodeByNodeDataFunc,
     )
  |> TreeSelectTreeUIService.setTree(_, uiState);