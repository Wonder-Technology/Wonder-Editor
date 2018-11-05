module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let engineState = StateEngineService.unsafeGetState();
    let (editorState, newIndex) =
      AssetIdUtils.generateAssetId |> StateLogicService.getEditorState;
    let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

    let materialName =
      MainEditorMaterialUtils.getNewMaterilaName()
      |. AssetUtils.getUniqueTreeNodeName(
           Material,
           targetTreeNodeId |. Some,
           (editorState, engineState),
         );

    let (newMaterial, engineState) =
      OperateLightMaterialLogicService.createLightMaterialAndSetName(
        materialName,
        engineState,
      );

    let editorState =
      AddMaterialNodeUtils.addMaterialNodeToAssetTree(
        newMaterial,
        (targetTreeNodeId, newIndex),
        editorState,
      );

    editorState |> StateEditorService.setState |> ignore;

    dispatchFunc(
      AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);