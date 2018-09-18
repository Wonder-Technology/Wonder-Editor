open EditorType;

open AssetNodeType;

let getImageBase64Map = editorState =>
  editorState.assetRecord |> ImageBase64MapAssetService.getImageBase64Map;

let setImageBase64Map = (imageBase64Map, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> ImageBase64MapAssetService.setImageBase64Map(imageBase64Map),
};

let setResult = (imageId, imageResult, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> ImageBase64MapAssetService.setResult(imageId, imageResult),
};

let buildImageResult = (base64, name, textureArray) => {
  base64,
  name,
  textureArray,
};