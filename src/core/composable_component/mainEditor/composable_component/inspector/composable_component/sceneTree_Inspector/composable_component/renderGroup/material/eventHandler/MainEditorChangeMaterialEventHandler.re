open MainEditorMaterialType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (materialType, materialType);

  let handleSelfLogic =
      ((store, dispatchFunc), (), (originMaterialType, materialType)) => {
    InspectorRenderGroupUtils.replaceMaterialByMaterialType(
      originMaterialType,
      materialType,
    );

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);