open EditorType;

let getNodeIndex = editorState =>
  editorState.assetRecord |> IndexAssetService.getNodeIndex;

let setNodeIndex = (index, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord |> IndexAssetService.setNodeIndex(index),
};

let getImageDataMapIndex = editorState =>
  editorState.assetRecord |> IndexAssetService.getImageDataMapIndex;

let setImageDataMapIndex = (index, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord |> IndexAssetService.setImageDataMapIndex(index),
};

let generateImageDataMapIndex = editorState => {
  let (newIndex, index) =
    IndexAssetService.generateImageDataMapIndex(
      getImageDataMapIndex(editorState),
    );

  (setImageDataMapIndex(newIndex, editorState), index);
};