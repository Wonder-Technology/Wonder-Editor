open AssetType;

let getCurrentNodeId = (assetRecord) => assetRecord.currentNodeId;

let unsafeGetCurrentNodeId = (assetRecord) =>
  assetRecord.currentNodeId |> OptionService.unsafeGet;

let clearCurrentNodeId = (assetRecord) => {...assetRecord, currentNodeId: None};

let setCurrentNodeId = (currentNodeId, assetRecord) => {
  ...assetRecord,
  currentNodeId: Some(currentNodeId)
};