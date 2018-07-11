open AssetType;

let getImageBase64Map = assetState => assetState.imageBase64Map;

let setImageBase64Map = (imageBase64Map, assetState) => {
  ...assetState,
  imageBase64Map,
};

let clearImageBase64Map = assetState => {
  ...assetState,
  imageBase64Map: WonderCommonlib.SparseMapService.createEmpty(),
};

let setResult = (textureIndex, base64, assetState) => {
  ...assetState,
  imageBase64Map:
    assetState.imageBase64Map
    |> SparseMapService.immutableSet(textureIndex, base64),
};