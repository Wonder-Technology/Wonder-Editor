let getRootNode = uiState =>
  RootTreeSelectTreeService.getRootNode(
    TreeSelectTreeUIService.unsafeGetTree(uiState),
  );