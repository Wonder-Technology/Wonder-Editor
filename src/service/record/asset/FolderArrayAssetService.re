open AssetType;

let unsafeGetFolderArray = (assetRecord) => assetRecord.folderArray;

let setFolderArray = (folderArray, assetRecord) => {...assetRecord, folderArray};