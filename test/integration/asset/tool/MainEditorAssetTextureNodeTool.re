open EditorType;

open AssetNodeType;

let getResult = (nodeId, editorState) =>
  editorState.assetRecord |> TextureNodeMapAssetService.getResult(nodeId);

let getTextureComponent = (nodeId, editorState) =>
  (getResult(nodeId, editorState) |> OptionService.unsafeGet).
    textureComponent;

let setTextureName = (nodeId, name, editorState) => {
  let textureComponent = getTextureComponent(nodeId, editorState);

  editorState
  |> AssetImageBase64MapEditorService.setResult(
       textureComponent,
       {
         ...
           AssetImageBase64MapEditorService.unsafeGetResult(
             textureComponent,
             editorState,
           ),
         name,
       },
     );
};