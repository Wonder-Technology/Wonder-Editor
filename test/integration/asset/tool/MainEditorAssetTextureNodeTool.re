open EditorType;

open AssetNodeType;

let getResult = (nodeId, editorState) =>
  editorState.assetRecord |> TextureNodeMapAssetService.getResult(nodeId);

let getTextureIndex = (nodeId, editorState) =>
  (getResult(nodeId, editorState) |> OptionService.unsafeGet).textureIndex;