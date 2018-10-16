module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let engineState = StateEngineService.unsafeGetState();
    let (editorState, newIndex) =
      AssetIdUtils.generateAssetId |> StateLogicService.getEditorState;
    let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

    let (newMaterial, engineState) =
      OperateLightMaterialLogicService.createLightMaterialAndSetName(
        OperateLightMaterialLogicService.getMaterialDefaultName()
        |. AssetUtils.getUniqueTreeNodeName(
             Material,
             targetTreeNodeId |. Some,
             (editorState, engineState),
           ),
        engineState,
      );
    let newMaterialType = AssetMaterialDataType.LightMaterial;

    let (editorState, nodeId) =
      AssetIdUtils.generateAssetId |> StateLogicService.getEditorState;

    editorState
    |> AssetMaterialNodeMapEditorService.setResult(
         newIndex,
         AssetMaterialNodeMapEditorService.buildMaterialNodeResult(
           targetTreeNodeId |. Some,
           AssetMaterialDataType.LightMaterial,
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