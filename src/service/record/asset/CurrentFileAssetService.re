open AssetType;

let getCurrentFile = (assetRecord) => assetRecord.currentFile;

let unsafeGetCurrentFile = (assetRecord) =>
  assetRecord.currentFile |> OptionService.unsafeGet;

let clearCurrentFile = (assetRecord) => {...assetRecord, currentFile: None};

let setCurrentFile = (currentFile, assetRecord) => {
  ...assetRecord,
  currentFile: Some(currentFile)
};