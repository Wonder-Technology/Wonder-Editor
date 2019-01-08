module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let engineState = StateEngineService.unsafeGetState();
    let (editorState, newNodeId) =
      IdAssetEditorService.generateNodeId |> StateLogicService.getEditorState;
    let targetTreeNode =
      editorState
      |> OperateTreeAssetEditorService.unsafeGetSelectedFolderNodeInAssetTree;

    let materialName =
      OperateMaterialLogicService.getNewMaterilaName()
      |. OperateTreeAssetLogicService.getUniqueNodeName(
           targetTreeNode,
           engineState,
         );

    let (newMaterial, engineState) =
      OperateLightMaterialLogicService.createLightMaterialAndSetName(
        materialName,
        engineState,
      );

    let editorState =
      MaterialNodeAssetEditorService.addMaterialNodeToAssetTree(
        targetTreeNode,
        MaterialNodeAssetService.buildNode(
          ~nodeId=newNodeId,
          ~type_=MaterialDataAssetType.LightMaterial,
          ~materialComponent=newMaterial,
        ),
        editorState,
      );

    let targetTreeNode =
      editorState
      |> OperateTreeAssetEditorService.unsafeGetSelectedFolderNodeInAssetTree;

    editorState |> StateEditorService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);