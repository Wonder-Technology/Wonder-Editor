module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = int;

  let _handleSetMap = (materialComponent, textureComponent, engineState) =>
    switch (
      BasicMaterialEngineService.getBasicMaterialMap(
        materialComponent,
        engineState,
      )
    ) {
    | None =>
      OperateTextureLogicService.handleMaterialComponentFromNoMapToHasMap(
        (materialComponent, textureComponent),
        (
          BasicMaterialEngineService.setBasicMaterialMap,
          BasicMaterialEngineService.reInitAllBasicMaterialsAndClearShaderCache,
        ),
        engineState,
      )
    | Some(_map) =>
      OperateTextureLogicService.changeTextureMapAndRefreshEngineState(
        materialComponent,
        textureComponent,
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