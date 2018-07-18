open AssetType;

let getTextureNodeMap = assetState => assetState.textureNodeMap;

let setTextureNodeMap = (textureNodeMap, assetState) => {
  ...assetState,
  textureNodeMap,
};

let clearTextureNodeMap = assetState => {
  ...assetState,
  textureNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
};

let setResult = (index, result, assetState) => {
  ...assetState,
  textureNodeMap:
    assetState.textureNodeMap |> SparseMapService.immutableSet(index, result),
};