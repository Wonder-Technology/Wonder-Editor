open EditorType;

let getPXImageData = (index, editorState) =>
  CubemapTextureImageDataMapAssetService.getPXImageData(
    index,
    editorState.assetRecord,
  );