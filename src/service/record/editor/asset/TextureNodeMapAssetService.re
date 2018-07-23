open AssetType;

let getTextureNodeMap = assetRecord => assetRecord.textureNodeMap;

let setTextureNodeMap = (textureNodeMap, assetRecord) => {
  ...assetRecord,
  textureNodeMap,
};

let clearTextureNodeMap = assetRecord => {
  ...assetRecord,
  textureNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
};

let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  textureNodeMap:
    assetRecord.textureNodeMap |> SparseMapService.immutableSet(index, result),
};