open EditorType;

let getIndex = editorState =>
  editorState.assetRecord |> IndexAssetService.getIndex;

let increaseIndex = editorState => {
  ...editorState,
  assetRecord: editorState.assetRecord |> IndexAssetService.increaseIndex,
};

let getLastDefaultComponentIndex = editorState =>
  editorState.assetRecord |> IndexAssetService.getLastDefaultComponentIndex;

let setLastDefaultComponentIndex = (lastDefaultComponentIndex, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> IndexAssetService.setLastDefaultComponentIndex(lastDefaultComponentIndex),
};