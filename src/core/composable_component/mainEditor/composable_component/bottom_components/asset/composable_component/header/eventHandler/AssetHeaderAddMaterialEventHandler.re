module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let materialName = "New Material";
    let materialPostfix = ".mat";

    let (newMaterial, engineState) =
      OperateLightMaterialLogicService.createLightMaterial(
        StateEngineService.unsafeGetState(),
      );

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
             MainEditorMaterialType.LightMaterial,
             newMaterial,
           ),
         )
      |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
           targetTreeNodeId,
           nodeId,
           Material,
         );

    let engineState =
      engineState
      |> AssetMaterialNodeMapLogicService.setMaterialBaseName(
           nodeId,
           materialName,
           AssetMaterialNodeMapEditorService.getMaterialNodeMap(editorState),
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