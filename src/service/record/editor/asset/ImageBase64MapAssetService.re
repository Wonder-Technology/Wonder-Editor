open AssetType;

let getImageBase64Map = assetRecord => assetRecord.imageBase64Map;

let setImageBase64Map = (imageBase64Map, assetRecord) => {
  ...assetRecord,
  imageBase64Map,
};

let unsafeGetResult = (imageId, assetRecord) =>
  assetRecord.imageBase64Map
  |> WonderCommonlib.SparseMapService.unsafeGet(imageId);

let setResult = (imageId, imageResult, assetRecord) => {
  ...assetRecord,
  imageBase64Map:
    assetRecord.imageBase64Map
    |> SparseMapService.immutableSet(imageId, imageResult),
};