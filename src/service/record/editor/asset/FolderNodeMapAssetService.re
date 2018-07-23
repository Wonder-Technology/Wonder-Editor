open AssetType;
open AssetNodeType;

let getFolderNodeMap = assetRecord => assetRecord.folderNodeMap;

let setFolderNodeMap = (folderNodeMap, assetRecord) => {
  ...assetRecord,
  folderNodeMap,
};

let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  folderNodeMap:
    assetRecord.folderNodeMap |> SparseMapService.immutableSet(index, result),
};