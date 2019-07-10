let _buildImageObj = src =>
  {"src": src, "getAttribute": prop => src} |> Obj.magic;

/* let getSpecificTreeNode = (nodeId, editorState) =>
   TreeAssetEditorService.getSpecificTreeNodeById(
     nodeId,
     TreeRootAssetEditorService.unsafeGetAssetTreeRoot(editorState),
   ); */

/* let insertScriptEventFunctionNode =
       (
         materialNodeId,
         parentFolderNodeId,
         material,
         (editorState, engineState),
       ) => (
     editorState
     |> OperateTreeAssetEditorService.insertNode(
          parentFolderNodeId,
          ScriptEventFunctionNodeAssetService.buildNode(
            ~nodeId=materialNodeId,
            ~materialComponent=material,
            ~type_=ScriptEventFunctionDataAssetType.LightScriptEventFunction,
          ),
        ),
     engineState,
   ); */

let insertMaterialNode =
    (
      materialNodeId,
      parentFolderNodeId,
      (material, snapshotImageDataIndex),
      (editorState, engineState),
    ) => (
  editorState
  |> OperateTreeAssetEditorService.insertNode(
       parentFolderNodeId,
       MaterialNodeAssetService.buildNode(
         ~nodeId=materialNodeId,
         ~materialComponent=material,
         ~type_=MaterialDataAssetType.LightMaterial,
         ~snapshotImageDataIndex,
       ),
     )
  |> ImageDataMapAssetEditorService.setData(
       snapshotImageDataIndex,
       ImageDataMapAssetService.buildData(
         ~base64=OperateMaterialLogicService.getDefaultSnapshotBase64()->Some,
         ~uint8Array=None,
         ~blobObjectURL=None,
         ~name="material",
         ~mimeType=ImageUtils.getDefaultMimeType(),
         (),
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
      imageDataIndex,
      (editorState, engineState),
    ) => (
  editorState
  |> OperateTreeAssetEditorService.insertNode(
       parentFolderNodeId,
       WDBNodeAssetService.buildNode(
         ~nodeId=wdbNodeId,
         ~wdbGameObject=gameObject,
         ~name,
         ~imageDataIndex,
       ),
     )
  |> ImageDataMapAssetEditorService.setData(
       imageDataIndex,
       ImageDataMapAssetService.buildData(
         ~base64=None,
         ~uint8Array=None,
         ~name="material",
         ~mimeType=ImageUtils.getDefaultMimeType(),
         (),
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
    TextureUtils.createAndInitTexture(textureName, ".png", engineState);
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
           ~blobObjectURL=None,
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
           ->(
               OperateTreeAssetLogicService.getUniqueNodeName(
                 OperateTreeAssetEditorService.unsafeFindNodeById(
                   parentFolderNodeId,
                   editorState,
                 ),
                 engineState,
               )
             ),
         ~children=UIStateAssetService.build(~isShowChildren=true, ()),
         (),
       ),
     ),
  engineState,
);

let insertCubemapNode =
    (
      nodeId,
      parentFolderNodeId,
      textureComponent,
      (editorState, engineState),
    ) => (
  editorState
  |> OperateTreeAssetEditorService.insertNode(
       parentFolderNodeId,
       CubemapNodeAssetService.buildNode(
         ~nodeId,
         ~textureComponent,
         ~pxImageDataIndex=None,
         ~nxImageDataIndex=None,
         ~pyImageDataIndex=None,
         ~nyImageDataIndex=None,
         ~pzImageDataIndex=None,
         ~nzImageDataIndex=None,
       ),
     ),
  engineState,
);