open MainEditorMaterialType;

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
    /* TODO finish gameObject instead of 0 */
    MaterialInspectorUtils.replaceMaterialByMaterialType(
      (nodeId, 0, materialComponent),
      originMaterialType,
      materialType,
    );

    dispatchFunc(AppStore.UpdateAction(Update([|BottomComponent|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);