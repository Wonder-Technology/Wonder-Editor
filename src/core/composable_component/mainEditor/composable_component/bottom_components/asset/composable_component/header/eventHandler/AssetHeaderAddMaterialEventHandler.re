module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let materialName = MaterialAssetUtils.getNewMaterilaAssetName();
    let materialPostfix = ".mat";

    let (newMaterial, engineState) =
      OperateLightMaterialLogicService.createLightMaterial(
        StateEngineService.unsafeGetState(),
      );
    let newMaterialType = MainEditorMaterialType.LightMaterial;

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
      MaterialAssetUtils.setName(newMaterial, newMaterialType, engineState);

    editorState |> StateEditorService.setState |> ignore;
    engineState |> StateEngineService.setState |> ignore;

    dispatchFunc(
      AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);