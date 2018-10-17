open AssetMaterialDataType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = (
    option(AssetNodeType.nodeId),
    (int, int),
    (materialType, materialType),
  );

  let handleSelfLogic =
      (
        (store, dispatchFunc),
        currentSceneTreeNode,
        (
          materialNodeId,
          (sourceMaterial, targetMaterial),
          (sourceMaterialType, targetMaterialType),
        ),
      ) => {
    let editorState = StateEditorService.getState();

    let editorState =
      switch (materialNodeId) {
      | None => editorState
      | Some(materialNodeId) =>
        AssetMaterialNodeIdMapEditorService.setNodeId(
          targetMaterial,
          materialNodeId,
          editorState,
        )
      };

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