let isNodeIdEqual = (currentNodeIdOpt, targetNodeId) =>
  switch (currentNodeIdOpt) {
  | None => false
  | Some(currentNodeId) =>
    NodeAssetService.isIdEqual(currentNodeId, targetNodeId)
  };