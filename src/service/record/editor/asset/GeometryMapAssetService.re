open AssetType;

let getGeometryMap = assetRecord => assetRecord.geometryMap;

let setGeometryMap = (geometryMap, assetRecord) => {
  ...assetRecord,
  geometryMap,
};

let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  geometryMap:
    assetRecord.geometryMap |> SparseMapService.immutableSet(index, result),
};