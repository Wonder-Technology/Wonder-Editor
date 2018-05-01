open AssetType;

let getCurrentTreeNode = (assetRecord) => assetRecord.currentTreeNode;

let unsafeGetCurrentTreeNode = (assetRecord) =>
  assetRecord.currentTreeNode |> OptionService.unsafeGet;

let clearCurrentTreeNode = (assetRecord) => {...assetRecord, currentTreeNode: None};

let setCurrentTreeNode = (currentTreeNode, assetRecord) => {
  ...assetRecord,
  currentTreeNode: Some(currentTreeNode)
};