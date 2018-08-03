open MainEditorMaterialType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (materialType, materialType);

  let handleSelfLogic =
      ((store, dispatchFunc), (), (originMaterialType, materialType)) =>
    MainEditorMaterialUtils.replaceMaterialByType(
      originMaterialType,
      materialType,
    );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);