open AssetType;

let getCurrentAssetFileNode = (assetRecord) => assetRecord.currentAssetFileNode;

let unsafeGetCurrentAssetFileNode = (assetRecord) =>
  assetRecord.currentAssetFileNode |> OptionService.unsafeGet;

let clearCurrentAssetFileNode = (assetRecord) => {...assetRecord, currentAssetFileNode: None};

let setCurrentAssetFileNode = (currentAssetFileNode, assetRecord) => {
  ...assetRecord,
  currentAssetFileNode: Some(currentAssetFileNode)
};