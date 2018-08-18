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

    let editorState =
      AssetIndexEditorService.increaseIndex |> StateLogicService.getEditorState;
    let newIndex = editorState |> AssetIndexEditorService.getIndex;

    editorState
    |> AssetMaterialNodeMapEditorService.setResult(
         newIndex,
         AssetNodeEditorService.buildMaterialNodeResult(
           "New Material",
           MainEditorMaterialType.LightMaterial,
           newMaterial,
         ),
       )
    |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
         editorState |> AssetUtils.getTargetTreeNodeId,
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