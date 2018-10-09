open EditorType;

open AssetNodeType;

let getResult = (nodeId, editorState) =>
  editorState.assetRecord |> TextureNodeMapAssetService.getResult(nodeId);

let getTextureComponent = (nodeId, editorState) =>
  (getResult(nodeId, editorState) |> OptionService.unsafeGet).textureComponent;