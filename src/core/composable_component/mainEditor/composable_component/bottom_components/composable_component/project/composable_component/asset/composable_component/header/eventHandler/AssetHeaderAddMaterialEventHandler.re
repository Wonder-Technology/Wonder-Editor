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
      OperateMaterialLogicService.getNewMaterilaName()
      ->(
          OperateTreeAssetLogicService.getUniqueNodeName(
            targetTreeNode,
            engineState,
          )
        );

    let (newMaterial, engineState) =
      LightMaterialEngineService.createLightMaterialAndSetName(
        materialName,
        engineState,
      );

    let (editorState, newImageDataIndex) =
      IndexAssetEditorService.generateImageDataMapIndex(editorState);

    let editorState =
      MaterialNodeAssetEditorService.addMaterialNodeToAssetTree(
        targetTreeNode,
        MaterialNodeAssetService.buildNode(
          ~nodeId=newNodeId,
          ~type_=MaterialDataAssetType.LightMaterial,
          ~materialComponent=newMaterial,
          ~imageDataIndex=newImageDataIndex,
        ),
        editorState,
      )
      |> ImageDataMapAssetEditorService.setData(
           newImageDataIndex,
           ImageDataMapAssetService.buildData(
             ~base64=None,
             ~uint8Array=None,
             ~name=materialName,
             ~mimeType="image/png",
             (),
           ),
         );

    editorState |> StateEditorService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);