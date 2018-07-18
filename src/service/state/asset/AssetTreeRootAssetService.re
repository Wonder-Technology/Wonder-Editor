open AssetTreeNodeType;

open AssetType;

let getAssetTreeRoot = assetState => assetState.assetTreeRoot;

let unsafeGetAssetTreeRoot = assetState =>
  assetState.assetTreeRoot |> OptionService.unsafeGet;

let setAssetTreeRoot = (assetTreeRoot, assetState) => {
  ...assetState,
  assetTreeRoot: Some(assetTreeRoot),
};

let getRootTreeNodeId = assetState =>
  switch (assetState |> getAssetTreeRoot) {
  | None => assetState |> IndexAssetService.getIndex
  | Some(assetTreeRoot) => assetTreeRoot.id
  };