module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let (editorState, newIndex) =
      AssetIdUtils.getAssetId |> StateLogicService.getEditorState;
    let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

    let (newMaterial, engineState) =
      OperateLightMaterialLogicService.createLightMaterialAndSetName(
        OperateLightMaterialLogicService.getMaterialDefaultName()
        |. AssetTreeEditorService.getUniqueTreeNodeName(
             Material,
             targetTreeNodeId |. Some,
             editorState,
           ),
        StateEngineService.unsafeGetState(),
      );

    engineState |> StateEngineService.setState |> ignore;

    editorState
    |> AssetMaterialNodeMapEditorService.setResult(
         newIndex,
         AssetMaterialNodeMapEditorService.buildMaterialNodeResult(
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