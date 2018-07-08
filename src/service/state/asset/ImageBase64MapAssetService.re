open AssetType;

let unsafeGetImageBase64Map = assetState => assetState.imageBase64Map;

let setImageBase64Map = (imageBase64Map, assetState) => {
  ...assetState,
  imageBase64Map,
};

let clearImageBase64Map = assetState => {
  ...assetState,
  imageBase64Map: WonderCommonlib.SparseMapService.createEmpty(),
};

let setResult = (textureId, base64, assetState) => {
  ...assetState,
  imageBase64Map:
    assetState.imageBase64Map
    |> SparseMapService.immutableSet(textureId, base64),
};