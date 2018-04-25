open AssetType;

let getCurrentTreeNode = (assetRecord) => assetRecord.currentTreeNode;

let unsafeGetCurrentTreeNode = (assetRecord) =>
  assetRecord.currentTreeNode |> OptionService.unsafeGet;

let setCurrentTreeNode = (currentTreeNode, assetRecord) => {
  ...assetRecord,
  assetTree: Some(currentTreeNode)
};