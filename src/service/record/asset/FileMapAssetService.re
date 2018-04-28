open AssetType;

let getFileMap = (assetRecord) => assetRecord.fileMap;

let setFileMap = (fileMap, assetRecord) => {...assetRecord, fileMap};