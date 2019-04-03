open MaterialDataAssetType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = (
    option(NodeAssetType.nodeId),
    (int, int),
    (materialType, materialType),
  );
  type return = unit;

  let handleSelfLogic =
      (
        (uiState, dispatchFunc),
        currentSceneTreeNode,
        (
          materialNodeId,
          (sourceMaterial, targetMaterial),
          (sourceMaterialType, targetMaterialType),
        ),
      ) => {
    let editorState = StateEditorService.getState();

    let editorState =
      materialNodeId
      |> OptionService.eitherWithNoData(
           materialNodeId =>
             MaterialNodeAssetEditorService.updateMaterialNodeData(
               materialNodeId,
               targetMaterial,
               targetMaterialType,
               editorState,
             ),
           () => editorState,
         );

    editorState |> StateEditorService.setState |> ignore;

    let engineState = StateEngineService.unsafeGetState();

    let engineState =
      engineState
      |> InspectorRenderGroupUtils.Remove.replaceMaterialByMaterialData(
           currentSceneTreeNode,
           (
             (sourceMaterial, targetMaterial),
             (sourceMaterialType, targetMaterialType),
           ),
         )
      |> GameObjectEngineService.initGameObject(currentSceneTreeNode);

    StateLogicService.refreshEngineState(engineState);
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);