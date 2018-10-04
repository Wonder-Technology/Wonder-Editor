module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = int;

  let _handleSetMap =
      (materialGameObjects, materialComponent, textureIndex, engineState) =>
    switch (
      LightMaterialEngineService.getLightMaterialDiffuseMap(
        materialComponent,
        engineState,
      )
    ) {
    | None =>
      OperateTextureLogicService.handleMaterialComponentFromNoMapToHasMap(
        (materialComponent, textureIndex),
        (
          LightMaterialEngineService.setLightMaterialDiffuseMap,
          LightMaterialEngineService.reInitAllLightMaterialsAndClearShaderCache,
        ),
        engineState,
      )
    | Some(_map) =>
      OperateTextureLogicService.changeTextureMapAndRefreshEngineState(
        materialComponent,
        textureIndex,
        LightMaterialEngineService.setLightMaterialDiffuseMap,
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