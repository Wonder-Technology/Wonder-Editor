open AssetTreeNodeType;

open AssetType;

let getAssetTreeRoot = assetRecord => assetRecord.assetTreeRoot;

let unsafeGetAssetTreeRoot = assetRecord =>
  assetRecord.assetTreeRoot |> OptionService.unsafeGet;

let setAssetTreeRoot = (assetTreeRoot, assetRecord) => {
  ...assetRecord,
  assetTreeRoot: Some(assetTreeRoot),
};