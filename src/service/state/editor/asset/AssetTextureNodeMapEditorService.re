open EditorType;

let getTextureNodeMap = editorState =>
  editorState.assetRecord |> TextureNodeMapAssetService.getTextureNodeMap;

let setTextureNodeMap = (textureNodeMap, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> TextureNodeMapAssetService.setTextureNodeMap(textureNodeMap),
};


let setResult = (index, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> TextureNodeMapAssetService.setResult(index, result),
};