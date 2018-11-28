open AssetType;

let getTextureNodeMap = assetRecord => assetRecord.textureNodeMap;

let setTextureNodeMap = (textureNodeMap, assetRecord) => {
  ...assetRecord,
  textureNodeMap,
};

let getResult = (index, assetRecord) =>
  assetRecord.textureNodeMap |> WonderCommonlib.SparseMapService.get(index);

let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  textureNodeMap:
    assetRecord.textureNodeMap |> SparseMapService.immutableSet(index, result),
};