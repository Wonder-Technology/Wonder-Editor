open EditorType;

let getIndex = editorState =>
  editorState.assetRecord |> IndexAssetService.getIndex;

let increaseIndex = editorState => {
  ...editorState,
  assetRecord: editorState.assetRecord |> IndexAssetService.increaseIndex,
};