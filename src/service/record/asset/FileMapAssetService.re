open AssetType;

let unsafeGetFileMap = (assetRecord) => assetRecord.fileMap;

let setFileMap = (fileMap, assetRecord) => {...assetRecord, fileMap};