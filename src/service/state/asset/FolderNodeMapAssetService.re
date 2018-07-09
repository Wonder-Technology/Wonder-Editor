open AssetType;
open AssetNodeType;

let unsafeGetFolderNodeMap = assetState => assetState.folderNodeMap;

let setFolderNodeMap = (folderNodeMap, assetState) => {
  ...assetState,
  folderNodeMap,
};

let clearFolderNodeMap = assetState => {
  ...assetState,
  folderNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
};

let setResult = (index, result, assetState) => {
  ...assetState,
  folderNodeMap:
    assetState.folderNodeMap |> SparseMapService.immutableSet(index, result),
};

let getFolderBaseNameAndExtName =
    (currentNodeId, folderNodeMap: array(folderResultType)) =>
  folderNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name}) => name)
  |> FileNameService.getBaseNameAndExtName;