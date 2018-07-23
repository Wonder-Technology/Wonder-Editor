open AssetTreeNodeType;

open AssetType;

let getAssetTreeRoot = assetRecord => assetRecord.assetTreeRoot;

let unsafeGetAssetTreeRoot = assetRecord =>
  assetRecord.assetTreeRoot |> OptionService.unsafeGet;

let setAssetTreeRoot = (assetTreeRoot, assetRecord) => {
  ...assetRecord,
  assetTreeRoot: Some(assetTreeRoot),
};

let getRootTreeNodeId = assetRecord =>
  switch (assetRecord |> getAssetTreeRoot) {
  | None => assetRecord |> IndexAssetService.getIndex
  | Some(assetTreeRoot) => assetTreeRoot.id
  };