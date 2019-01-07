open MaterialDataAssetType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (materialType, materialType);
  type return = unit;

  let _updateMaterialNodeData =
      (
        sourceMaterial,
        sourceMaterialType,
        targetMaterial,
        targetMaterialType,
        editorState,
      ) =>
    switch (
      OperateTreeAssetEditorService.findMaterialNode(
        sourceMaterial,
        sourceMaterialType,
        editorState,
      )
    ) {
    | None => editorState
    | Some(materialNode) =>
      MaterialNodeAssetEditorService.updateMaterialNodeData(
        NodeAssetService.getNodeId(~node=materialNode),
        targetMaterial,
        targetMaterialType,
        editorState,
      )
    };

  let _replaceSourceMaterialWithItsAllGameObjects =
      (gameObjects, materialData, engineState) =>
    gameObjects
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) =>
           InspectorRenderGroupUtils.Remove.replaceMaterialByMaterialData(
             gameObject,
             materialData,
             engineState,
           ),
         engineState,
       );

  let handleSelfLogic =
      ((store, dispatchFunc), (), (sourceMaterialType, targetMaterialType)) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let gameObject =
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState);

    let sourceMaterial =
      MainEditorMaterialUtils.getMaterialComponentByType(
        gameObject,
        sourceMaterialType,
        engineState,
      );

    let (engineState, targetMaterial) =
      MainEditorMaterialUtils.createMaterialByType(
        targetMaterialType,
        engineState,
      );

    let gameObjects =
      engineState
      |> MainEditorMaterialUtils.unsafeGetGameObjectsByType(
           sourceMaterial,
           sourceMaterialType,
         )
      |> Js.Array.copy;

    let engineState =
      _replaceSourceMaterialWithItsAllGameObjects(
        gameObjects,
        (
          (sourceMaterial, targetMaterial),
          (sourceMaterialType, targetMaterialType),
        ),
        engineState,
      );

    let engineState =
      OperateMaterialLogicService.setName(
        ~material=targetMaterial,
        ~type_=targetMaterialType,
        ~name=
          NodeNameAssetLogicService.getMaterialNodeName(
            ~material=sourceMaterial,
            ~type_=sourceMaterialType,
            ~engineState,
          ),
        ~engineState,
      );

    engineState |> StateLogicService.refreshEngineState;

    _updateMaterialNodeData(
      sourceMaterial,
      sourceMaterialType,
      targetMaterial,
      targetMaterialType,
      editorState,
    )
    |> StateEditorService.setState
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);