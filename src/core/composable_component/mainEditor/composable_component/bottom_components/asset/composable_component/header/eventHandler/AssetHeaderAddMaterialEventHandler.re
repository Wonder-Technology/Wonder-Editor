module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let (newMaterial, editEngineState, runEngineState) =
      OperateLightMaterialLogicService.createLightMaterial(
        StateLogicService.getEditEngineState(),
        StateLogicService.getRunEngineState(),
      );

    editEngineState |> StateLogicService.setEditEngineState;

    runEngineState |> StateLogicService.setRunEngineState;

    let (editorState, newIndex) =
      AssetIdUtils.getAssetId |> StateLogicService.getEditorState;
    let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

    editorState
    |> AssetMaterialNodeMapEditorService.setResult(
         newIndex,
         AssetMaterialNodeMapEditorService.buildMaterialNodeResult(
           "New Material",
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