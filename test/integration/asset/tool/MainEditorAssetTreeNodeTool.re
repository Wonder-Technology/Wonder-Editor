let _buildImageObj = src =>
  {"src": src, "getAttribute": prop => src} |> Obj.magic;

/* let getSpecificTreeNode = (nodeId, editorState) =>
   TreeAssetEditorService.getSpecificTreeNodeById(
     nodeId,
     TreeRootAssetEditorService.unsafeGetAssetTreeRoot(editorState),
   ); */

let insertMaterialNode =
    (
      materialNodeId,
      parentFolderNodeId,
      material,
      (editorState, engineState),
    ) => (
  editorState
  |> OperateTreeAssetEditorService.insertNode(
       parentFolderNodeId,
       MaterialNodeAssetService.buildNode(
         ~nodeId=materialNodeId,
         ~materialComponent=material,
         ~type_=MaterialDataAssetType.LightMaterial,
       ),
     ),
  engineState,
);


let insertWDBNode =
    (
      wdbNodeId,
      parentFolderNodeId,
      gameObject,
      name,
      (editorState, engineState),
    ) => (
  editorState
  |> OperateTreeAssetEditorService.insertNode(
       parentFolderNodeId,
       WDBNodeAssetService.buildNode(
         ~nodeId=wdbNodeId,
         ~wdbGameObject=gameObject,
         ~name
       ),
     ),
  engineState,
);


let insertTextureNode =
    (
      textureNodeId,
      parentFolderNodeId,
      textureName,
      (editorState, engineState),
    ) => {
  let (textureComponent, engineState) =
    TextureUtils.createAndInitTexture(textureName, engineState);
  let imageSrc = textureName ++ "img";

  let engineState =
    engineState
    |> BasicSourceTextureEngineService.setSource(
         _buildImageObj(imageSrc)
         |> ImageType.convertImgToHtmlImage
         |> Obj.magic,
         textureComponent,
       );

  let extName = ".jpg";

  (
    editorState
    |> ImageDataMapAssetEditorService.setData(
         textureComponent,
         ImageDataMapAssetService.buildData(
           ~base64=Some(imageSrc),
           ~uint8Array=None,
           ~name=textureName ++ extName,
           ~mimeType=ImageUtils.getImageMimeType(extName, editorState),
           (),
         ),
       )
    |> OperateTreeAssetEditorService.insertNode(
         parentFolderNodeId,
         TextureNodeAssetService.buildNode(
           ~nodeId=textureNodeId,
           ~textureComponent,
           ~imageDataIndex=textureComponent,
         ),
       ),
    engineState,
  );
};

let insertFolderNode =
    (folderNodeId, parentFolderNodeId, (editorState, engineState)) => (
  editorState
  |> OperateTreeAssetEditorService.insertNode(
       parentFolderNodeId,
       FolderNodeAssetService.buildNode(
         ~nodeId=folderNodeId,
         ~name=
           MainEditorAssetFolderNodeTool.getNoNameFolderName()
           |. OperateTreeAssetLogicService.getUniqueNodeName(
                OperateTreeAssetEditorService.unsafeFindNodeById(
                  parentFolderNodeId,
                  editorState,
                ),
                engineState,
              ),
         ~children=UIStateAssetService.build(~isShowChildren=true, ()),
         (),
       ),
     ),
  engineState,
);