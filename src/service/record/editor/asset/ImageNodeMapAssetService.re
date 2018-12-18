open AssetType;

let getImageNodeMap = assetRecord => assetRecord.imageNodeMap;

let setImageNodeMap = (imageNodeMap, assetRecord) => {
  ...assetRecord,
  imageNodeMap,
};

let unsafeGetResult = (imageId, assetRecord) =>
  assetRecord.imageNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(imageId);

let setResult = (imageId, imageResult, assetRecord) => {
  ...assetRecord,
  imageNodeMap:
    assetRecord.imageNodeMap
    |> SparseMapService.immutableSet(imageId, imageResult),
};