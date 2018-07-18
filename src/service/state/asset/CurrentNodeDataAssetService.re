open AssetType;

let getCurrentNodeData = assetState => assetState.currentNodeData;

let unsafeGetCurrentNodeData = assetState =>
  assetState.currentNodeData |> OptionService.unsafeGet;

let clearCurrentNodeData = assetState => {...assetState, currentNodeData: None};

let setCurrentNodeData = (currentNodeData, assetState) => {
  ...assetState,
  currentNodeData: Some(currentNodeData),
};