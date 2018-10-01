module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = int;
  let _handleSetMap =
      (materialGameObjects, materialComponent, textureIndex, engineState) =>
    switch (
      BasicMaterialEngineService.getBasicMaterialMap(
        materialComponent,
        engineState,
      )
    ) {
    | None =>
      OperateTextureLogicService.handleMaterialComponentFromNoMapToHasMap(
        (materialComponent, textureIndex),
        (
          BasicMaterialEngineService.setBasicMaterialMap,
          BasicMaterialEngineService.reInitAllBasicMaterialsAndClearShaderCache,
        ),
        engineState,
      )
    | Some(_map) =>
      OperateTextureLogicService.changeTextureMapAndRefreshEngineState(
        materialComponent,
        textureIndex,
        OperateBasicMaterialLogicService.setBasicMaterialMapToEngineState,
        engineState,
      )
    };

  let handleSelfLogic = ((store, dispatchFunc), materialComponent, dragedId) =>
    MaterialDragTextureEventHandlerUtils.handleSelfLogic(
      (store, dispatchFunc),
      materialComponent,
      dragedId,
      _handleSetMap,
    );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);