open AssetType;
open AssetNodeType;

let getWDBNodeMap = assetRecord => assetRecord.wdbNodeMap;

let setWDBNodeMap = (wdbNodeMap, assetRecord) => {
  ...assetRecord,
  wdbNodeMap,
};

let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  wdbNodeMap:
    assetRecord.wdbNodeMap |> SparseMapService.immutableSet(index, result),
};