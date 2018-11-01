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
  |> AssetImageNodeMapEditorService.setResult(
       textureComponent,
       {
         ...
           AssetImageNodeMapEditorService.unsafeGetResult(
             textureComponent,
             editorState,
           ),
         name,
       },
     );
};

let hasTextureComponent = (material, editorState) =>
  AssetTextureNodeMapEditorService.getValidValues(editorState)
  |> Js.Array.find(({textureComponent}: AssetNodeType.textureResultType) =>
       JudgeTool.isEqual(textureComponent, material)
     )
  |> Js.Option.isSome;