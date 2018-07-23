open EditorType;

let getImageBase64Map = editorState =>
  editorState.assetRecord |> ImageBase64MapAssetService.getImageBase64Map;

let setImageBase64Map = (imageBase64Map, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> ImageBase64MapAssetService.setImageBase64Map(imageBase64Map),
};


let setResult = (textureIndex, base64, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> ImageBase64MapAssetService.setResult(textureIndex, base64),
};