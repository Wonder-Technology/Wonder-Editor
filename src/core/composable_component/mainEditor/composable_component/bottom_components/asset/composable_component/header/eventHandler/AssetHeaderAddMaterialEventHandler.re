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
        MainEditorMaterialUtils.getMaterilaDefaultName()
        |. AssetUtils.getUniqueTreeNodeName(
             Material,
             targetTreeNodeId |. Some,
             (editorState, engineState),
           ),
        engineState,
      );

    editorState
    |> AssetTreeNodeUtils.addMaterialIntoNodeMap(
         newIndex,
         targetTreeNodeId |. Some,
         newMaterial,
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