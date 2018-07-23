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

let getRootTreeNodeId = editorState =>
  switch (editorState |> getAssetTreeRoot) {
  | None => editorState.assetRecord |> IndexAssetService.getIndex
  | Some(assetRecord) => assetRecord.id
  };