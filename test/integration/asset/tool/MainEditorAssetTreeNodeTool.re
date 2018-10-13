let addFolderIntoNodeMap = (index, parentNodeId, editorState, engineState) =>
  AssetTreeNodeUtils.addFolderIntoNodeMap(
    index,
    parentNodeId,
    (editorState, engineState),
  );

let _buildImageObj = src =>
  {"src": src, "getAttribute": prop => src} |> Obj.magic;

let addTextureIntoNodeMap = (index, parentNodeId, textureName, editorState) => {
  let (textureComponent, engineState) =
    TextureUtils.createAndInitTexture(
      textureName,
      StateEngineService.unsafeGetState(),
    );
  let imageSrc = textureName ++ "img";

  engineState
  |> BasicSourceTextureEngineService.setSource(
       _buildImageObj(imageSrc)
       |> ImageType.convertImgToHtmlImage
       |> Obj.magic,
       textureComponent,
     )
  |> StateEngineService.setState
  |> ignore;

  editorState
  |> AssetImageBase64MapEditorService.setResult(
       textureComponent,
       AssetImageBase64MapEditorService.buildImageResult(
         imageSrc,
         textureName ++ ".jpg",
         [|textureComponent|],
       ),
     )
  |> AssetTextureNodeMapEditorService.setResult(
       index,
       AssetTextureNodeMapEditorService.buildTextureNodeResult(
         textureComponent,
         parentNodeId |. Some,
         textureComponent,
       ),
     );
};