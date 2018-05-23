open AssetType;

let getCurrentAssetChildrenNodeParent = (assetRecord) =>
  assetRecord.currentAssetChildrenNodeParent;

let unsafeGetCurrentAssetChildrenNodeParent = (assetRecord) =>
  assetRecord.currentAssetChildrenNodeParent |> OptionService.unsafeGet;

let clearCurrentAssetChildrenNodeParent = (assetRecord) => {
  ...assetRecord,
  currentAssetChildrenNodeParent: None
};

let setCurrentAssetChildrenNodeParent = (currentAssetChildrenNodeParent, assetRecord) => {
  ...assetRecord,
  currentAssetChildrenNodeParent: Some(currentAssetChildrenNodeParent)
};