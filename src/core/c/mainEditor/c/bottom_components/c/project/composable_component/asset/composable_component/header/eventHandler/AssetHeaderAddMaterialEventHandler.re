module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), ()) => {
    let engineState = StateEngineService.unsafeGetState();
    let (editorState, newNodeId) =
      IdAssetEditorService.generateNodeId |> StateLogicService.getEditorState;
    let targetTreeNode =
      editorState
      |> OperateTreeAssetEditorService.unsafeGetSelectedFolderNodeInAssetTree;

    let materialName =
      engineState
      |> OperateTreeAssetLogicService.getUniqueNodeName(
           OperateMaterialLogicService.getNewMaterilaName(),
           targetTreeNode,
         );

    let (newMaterial, engineState) =
      LightMaterialEngineService.createLightMaterialAndSetName(
        materialName,
        engineState,
      );

    let (editorState, newImageDataIndex) =
      IndexAssetEditorService.generateBasicSourceTextureImageDataMapIndex(editorState);

    let editorState =
      MaterialNodeAssetEditorService.addMaterialNodeToAssetTree(
        targetTreeNode,
        MaterialNodeAssetService.buildNode(
          ~nodeId=newNodeId,
          ~type_=MaterialDataAssetType.LightMaterial,
          ~materialComponent=newMaterial,
          ~snapshotImageDataIndex=newImageDataIndex,
        ),
        editorState,
      )
      |> BasicSourceTextureImageDataMapAssetEditorService.setData(
           newImageDataIndex,
           BasicSourceTextureImageDataMapAssetService.buildData(
             ~base64=
               OperateMaterialLogicService.getDefaultSnapshotBase64()->Some,
             ~uint8Array=None,
             ~blobObjectURL=None,
             ~name=materialName,
             ~mimeType=ImageUtils.getDefaultMimeType(),
             (),
           ),
         );

    editorState |> StateEditorService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);