open AssetType;

let getCurrentNodeData = assetRecord => assetRecord.currentNodeData;

let unsafeGetCurrentNodeData = assetRecord =>
  assetRecord.currentNodeData |> OptionService.unsafeGet;

let clearCurrentNodeData = assetRecord => {...assetRecord, currentNodeData: None};

let setCurrentNodeData = (currentNodeData, assetRecord) => {
  ...assetRecord,
  currentNodeData: Some(currentNodeData),
};