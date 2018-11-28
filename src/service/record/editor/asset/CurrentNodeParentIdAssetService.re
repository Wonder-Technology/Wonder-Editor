open AssetType;

let getCurrentNodeParentId = assetRecord => assetRecord.currentNodeParentId;

let unsafeGetCurrentNodeParentId = assetRecord =>
  assetRecord.currentNodeParentId |> OptionService.unsafeGet;

let clearCurrentNodeParentId = assetRecord => {
  ...assetRecord,
  currentNodeParentId: None,
};

let setCurrentNodeParentId = (currentNodeParentId, assetRecord) => {
  ...assetRecord,
  currentNodeParentId: Some(currentNodeParentId),
};