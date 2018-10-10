module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let materialName = MainEditorMaterialUtils.getNewMaterilaAssetName();
    let materialPostfix = ".mat";

    let (newMaterial, engineState) =
      OperateLightMaterialLogicService.createLightMaterial(
        StateEngineService.unsafeGetState(),
      );
    let newMaterialType = AssetMaterialDataType.LightMaterial;

    let (editorState, nodeId) =
      AssetIdUtils.getAssetId |> StateLogicService.getEditorState;

    let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

    let editorState =
      editorState
      |> AssetMaterialNodeMapEditorService.setResult(
           nodeId,
           AssetMaterialNodeMapEditorService.buildMaterialNodeResult(
             materialPostfix,
             targetTreeNodeId |. Some,
             newMaterialType,
             newMaterial,
           ),
         )
      |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
           targetTreeNodeId,
           nodeId,
           Material,
         );

    let engineState =
      MainEditorMaterialUtils.setName(
        newMaterial,
        newMaterialType,
        MainEditorMaterialUtils.getNewMaterilaAssetName(),
        engineState,
      );

    editorState |> StateEditorService.setState |> ignore;
    engineState |> StateEngineService.setState |> ignore;

    dispatchFunc(
      AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);