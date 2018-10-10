open MaterialType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (int, int);
  type dataTuple = (materialType, materialType);

  let handleSelfLogic =
      (
        (store, dispatchFunc),
        (nodeId, materialComponent),
        (originMaterialType, materialType),
      ) => {
    MaterialInspectorUtils.replaceMaterialByMaterialType(
      (nodeId, materialComponent),
      originMaterialType,
      materialType,
    );

    dispatchFunc(
      AppStore.UpdateAction(Update([|BottomComponent, Inspector|])),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);