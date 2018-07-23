open AssetType;
open AssetNodeType;

let getFolderNodeMap = assetRecord => assetRecord.folderNodeMap;

let setFolderNodeMap = (folderNodeMap, assetRecord) => {
  ...assetRecord,
  folderNodeMap,
};

let clearFolderNodeMap = assetRecord => {
  ...assetRecord,
  folderNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
};

let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  folderNodeMap:
    assetRecord.folderNodeMap |> SparseMapService.immutableSet(index, result),
};

let getFolderBaseNameAndExtName =
    (currentNodeId, folderNodeMap: array(folderResultType)) =>
  folderNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name}) => name)
  |> FileNameService.getBaseNameAndExtName;