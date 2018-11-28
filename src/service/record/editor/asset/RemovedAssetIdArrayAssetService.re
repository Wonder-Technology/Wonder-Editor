open AssetType;

let getRemovedAssetIdArray = assetRecord => assetRecord.removedAssetIdArray;

let hasUsableAssetId = assetRecord =>
  assetRecord.removedAssetIdArray |> ArrayService.hasItem;

let setRemovedAssetIdArray = (removedAssetIdArray, assetRecord) => {
  ...assetRecord,
  removedAssetIdArray,
};