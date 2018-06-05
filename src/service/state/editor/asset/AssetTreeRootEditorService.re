open AssetTreeNodeType;

open EditorType;

let getAssetTreeRoot = editorState =>
  editorState.assetRecord |> AssetTreeRootAssetService.getAssetTreeRoot;

let unsafeGetAssetTreeRoot = editorState =>
  editorState.assetRecord |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot;

let setAssetTreeRoot = (assetTreeRoot, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> AssetTreeRootAssetService.setAssetTreeRoot(assetTreeRoot),
};

let getRootTreeNodeId = ({assetRecord} as editorState) =>
  switch (assetRecord |> AssetTreeRootAssetService.getAssetTreeRoot) {
  | None => assetRecord |> IndexAssetService.getIndex
  | Some(assetTreeRoot) => assetTreeRoot.id
  };