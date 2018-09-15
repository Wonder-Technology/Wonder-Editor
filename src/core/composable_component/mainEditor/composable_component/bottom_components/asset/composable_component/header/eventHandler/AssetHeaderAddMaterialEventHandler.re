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

    engineState |> StateEngineService.setState |> ignore;

    let (editorState, newIndex) =
      AssetIdUtils.getAssetId |> StateLogicService.getEditorState;
    let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

    editorState
    |> AssetMaterialNodeMapEditorService.setResult(
         newIndex,
         AssetMaterialNodeMapEditorService.buildMaterialNodeResult(
           materialName,
           materialPostfix,
           targetTreeNodeId |. Some,
           MainEditorMaterialType.LightMaterial,
           newMaterial,
         ),
       )
    |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
         targetTreeNodeId,
         newIndex,
         Material,
       )
    |> StateEditorService.setState
    |> ignore;

    dispatchFunc(
      AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);