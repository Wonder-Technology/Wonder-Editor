open AssetMaterialDataType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (int, int);
  type dataTuple = (materialType, materialType);

  let handleSelfLogic =
      (
        (store, dispatchFunc),
        (nodeId, materialComponent),
        (sourceMaterialType, targetMaterialType),
      ) => {
    MaterialInspectorUtils.replaceMaterialByMaterialType(
      (nodeId, materialComponent),
      sourceMaterialType,
      targetMaterialType,
    );

    dispatchFunc(
      AppStore.UpdateAction(Update([|BottomComponent, Inspector|])),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);