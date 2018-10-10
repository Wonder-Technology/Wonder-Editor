open AssetMaterialDataType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (materialType, materialType);

  let handleSelfLogic =
      ((store, dispatchFunc), (), (originMaterialType, materialType)) => {
    InspectorRenderGroupUtils.replaceMaterialByMaterialType(
      SceneEditorService.unsafeGetCurrentSceneTreeNode
      |> StateLogicService.getEditorState,
      originMaterialType,
      materialType,
      StateEngineService.unsafeGetState(),
    )
    |> StateLogicService.refreshEngineState;

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);