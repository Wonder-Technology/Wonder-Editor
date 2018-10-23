let addFolderIntoNodeMap = (index, parentFolderNodeId, editorState, engineState) =>
  AssetTreeNodeUtils.addFolderIntoNodeMap(
    index,
    parentFolderNodeId,
    (editorState, engineState),
  );

let addMaterialIntoNodeMap = AssetTreeNodeUtils.addMaterialIntoNodeMap;

let _buildImageObj = src =>
  {"src": src, "getAttribute": prop => src} |> Obj.magic;

let addTextureIntoNodeMap = (index, parentFolderNodeId, textureName, editorState) => {
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
         parentFolderNodeId |. Some,
         textureComponent,
       ),
     );
};