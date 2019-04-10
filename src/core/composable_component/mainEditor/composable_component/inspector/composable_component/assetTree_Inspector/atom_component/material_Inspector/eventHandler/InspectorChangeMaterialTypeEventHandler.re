open MaterialDataAssetType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (int, int);
  type dataTuple = (materialType, materialType);
  type return = Js.Promise.t(unit);

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

    LightMaterialForAssetEventHandlerUtils.createImgCanvasSnapshotAfterUpdateInspector(
      currentNodeId,
      dispatchFunc,
    );
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);