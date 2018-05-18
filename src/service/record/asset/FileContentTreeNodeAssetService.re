
open AssetType;

let getFileContentTreeNode = (assetRecord) => assetRecord.fileContentTreeNode;

let unsafeGetFileContentTreeNode = (assetRecord) =>
  assetRecord.fileContentTreeNode |> OptionService.unsafeGet;

let clearFileContentTreeNode = (assetRecord) => {...assetRecord, fileContentTreeNode: None};

let setFileContentTreeNode = (fileContentTreeNode, assetRecord) => {
  ...assetRecord,
  fileContentTreeNode: Some(fileContentTreeNode)
};