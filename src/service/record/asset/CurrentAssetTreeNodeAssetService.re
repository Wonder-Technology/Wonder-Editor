open AssetType;

let getCurrentAssetTreeNode = (assetRecord) => assetRecord.currentAssetTreeNode;

let unsafeGetCurrentAssetTreeNode = (assetRecord) =>
  assetRecord.currentAssetTreeNode |> OptionService.unsafeGet;

let clearCurrentAssetTreeNode = (assetRecord) => {...assetRecord, currentAssetTreeNode: None};

let setCurrentAssetTreeNode = (currentAssetTreeNode, assetRecord) => {
  ...assetRecord,
  currentAssetTreeNode: Some(currentAssetTreeNode)
};