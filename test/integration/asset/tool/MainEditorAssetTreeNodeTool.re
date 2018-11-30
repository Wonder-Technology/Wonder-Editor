let addFolderIntoNodeMapWithNoNameName =
    (index, parentFolderNodeId, editorState, engineState) =>
  FolderNodeUtils.addFolderIntoNodeMap(
    index,
    parentFolderNodeId,
    FolderNodeUtils.getNoNameFolderNameByNodeId(index, editorState),
    (editorState, engineState),
  );

let addMaterialIntoNodeMap = FolderNodeUtils.addMaterialIntoNodeMap;

let _buildImageObj = src =>
  {"src": src, "getAttribute": prop => src} |> Obj.magic;

let addTextureIntoNodeMap =
    (index, parentFolderNodeId, textureName, editorState) => {
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

  let extName = ".jpg";

  editorState
  |> ImageNodeMapAssetEditorService.setResult(
       textureComponent,
       ImageNodeMapAssetEditorService.buildImageNodeResult(
         ~base64=Some(imageSrc),
         ~uint8Array=None,
         ~name=textureName ++ extName,
         ~mimeType=ImageUtils.getImageMimeType(extName, editorState),
         ~isInWDB=false,
         (),
       ),
     )
  |> TextureNodeMapAssetEditorService.setResult(
       index,
       TextureNodeMapAssetEditorService.buildTextureNodeResult(
         ~textureComponent,
         ~parentFolderNodeId=parentFolderNodeId |. Some,
         ~image=textureComponent,
         ~isInWDB=false,
         (),
       ),
     );
};

let getSpecificTreeNode = (nodeId, editorState) =>
  TreeAssetEditorService.getSpecificTreeNodeById(
    nodeId,
    TreeRootAssetEditorService.unsafeGetAssetTreeRoot(editorState),
  );