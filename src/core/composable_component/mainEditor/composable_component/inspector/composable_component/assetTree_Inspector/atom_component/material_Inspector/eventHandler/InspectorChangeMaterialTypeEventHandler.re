open MaterialDataAssetType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (int, int);
  type dataTuple = (materialType, materialType);
  type return = unit;

  let handleSelfLogic =
      (
        (uiState, dispatchFunc),
        (currentNodeId, materialComponent),
        (sourceMaterialType, targetMaterialType),
      ) => {
    MaterialInspectorUtils.replaceMaterialByMaterialType(
      (currentNodeId, materialComponent),
      sourceMaterialType,
      targetMaterialType,
    );

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);