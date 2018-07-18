open AssetType;

let getCurrentNodeParentId = assetState => assetState.currentNodeParentId;

let unsafeGetCurrentNodeParentId = assetState =>
  assetState.currentNodeParentId |> OptionService.unsafeGet;

let clearCurrentNodeParentId = assetState => {
  ...assetState,
  currentNodeParentId: None,
};

let setCurrentNodeParentId = (currentNodeParentId, assetState) => {
  ...assetState,
  currentNodeParentId: Some(currentNodeParentId),
};