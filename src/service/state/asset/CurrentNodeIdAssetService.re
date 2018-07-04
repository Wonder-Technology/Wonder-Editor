open AssetType;

let getCurrentNodeId = assetState => assetState.currentNodeId;

let unsafeGetCurrentNodeId = assetState =>
  assetState.currentNodeId |> OptionService.unsafeGet;

let clearCurrentNodeId = assetState => {...assetState, currentNodeId: None};

let setCurrentNodeId = (currentNodeId, assetState) => {
  ...assetState,
  currentNodeId: Some(currentNodeId),
};