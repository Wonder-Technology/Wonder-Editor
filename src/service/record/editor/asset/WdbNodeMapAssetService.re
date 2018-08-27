open AssetType;
open AssetNodeType;

let getWdbNodeMap = assetRecord => assetRecord.wdbNodeMap;

let setWdbNodeMap = (wdbNodeMap, assetRecord) => {
  ...assetRecord,
  wdbNodeMap,
};

let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  wdbNodeMap:
    assetRecord.wdbNodeMap |> SparseMapService.immutableSet(index, result),
};