open AssetType;

let getGeometryNodeMap = assetRecord => assetRecord.geometryNodeMap;

let setGeometryNodeMap = (geometryNodeMap, assetRecord) => {
  ...assetRecord,
  geometryNodeMap,
};

let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  geometryNodeMap:
    assetRecord.geometryNodeMap |> SparseMapService.immutableSet(index, result),
};