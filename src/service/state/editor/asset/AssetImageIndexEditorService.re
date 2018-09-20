open EditorType;

let getImageIndex = editorState =>
  editorState.assetRecord |> ImageIndexAssetService.getImageIndex;

let increaseImageIndex = editorState => {
  ...editorState,
  assetRecord: editorState.assetRecord |> ImageIndexAssetService.increaseImageIndex,
};
