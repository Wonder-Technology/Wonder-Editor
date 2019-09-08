open EditorType;

let getNodeIndex = editorState =>
  editorState.assetRecord |> IndexAssetService.getNodeIndex;

let setNodeIndex = (index, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord |> IndexAssetService.setNodeIndex(index),
};

let getBasicSourceTextureImageDataMapIndex = editorState =>
  editorState.assetRecord
  |> IndexAssetService.getBasicSourceTextureImageDataMapIndex;

let setBasicSourceTextureImageDataMapIndex = (index, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> IndexAssetService.setBasicSourceTextureImageDataMapIndex(index),
};

let generateBasicSourceTextureImageDataMapIndex = editorState => {
  let (newIndex, index) =
    IndexAssetService.generateBasicSourceTextureImageDataMapIndex(
      getBasicSourceTextureImageDataMapIndex(editorState),
    );

  (setBasicSourceTextureImageDataMapIndex(newIndex, editorState), index);
};

let getCubemapTextureImageDataMapIndex = editorState =>
  editorState.assetRecord
  |> IndexAssetService.getCubemapTextureImageDataMapIndex;

let setCubemapTextureImageDataMapIndex = (index, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> IndexAssetService.setCubemapTextureImageDataMapIndex(index),
};

let generateCubemapTextureImageDataMapIndex = editorState => {
  let (newIndex, index) =
    IndexAssetService.generateCubemapTextureImageDataMapIndex(
      getCubemapTextureImageDataMapIndex(editorState),
    );

  (setCubemapTextureImageDataMapIndex(newIndex, editorState), index);
};

let getIMGUICustomImageTextureContentIndex = editorState =>
  editorState.assetRecord
  |> IndexAssetService.getIMGUICustomImageTextureContentIndex;

let setIMGUICustomImageTextureContentIndex = (index, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> IndexAssetService.setIMGUICustomImageTextureContentIndex(index),
};

let generateIMGUICustomImageTextureContentIndex = editorState => {
  let (newIndex, index) =
    IndexAssetService.generateIMGUICustomImageTextureContentIndex(
      getIMGUICustomImageTextureContentIndex(editorState),
    );

  (setIMGUICustomImageTextureContentIndex(newIndex, editorState), index);
};