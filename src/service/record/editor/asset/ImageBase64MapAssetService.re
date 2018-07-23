open AssetType;

let getImageBase64Map = assetRecord => assetRecord.imageBase64Map;

let setImageBase64Map = (imageBase64Map, assetRecord) => {
  ...assetRecord,
  imageBase64Map,
};

let clearImageBase64Map = assetRecord => {
  ...assetRecord,
  imageBase64Map: WonderCommonlib.SparseMapService.createEmpty(),
};

let setResult = (textureIndex, base64, assetRecord) => {
  ...assetRecord,
  imageBase64Map:
    assetRecord.imageBase64Map
    |> SparseMapService.immutableSet(textureIndex, base64),
};