module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = int;

  let _handleSetMap =
      (materialComponent, textureComponent, engineState) =>
    switch (
      LightMaterialEngineService.getLightMaterialDiffuseMap(
        materialComponent,
        engineState,
      )
    ) {
    | None =>
      OperateTextureLogicService.handleMaterialComponentFromNoMapToHasMap(
        (materialComponent, textureComponent),
        (
          LightMaterialEngineService.setLightMaterialDiffuseMap,
          LightMaterialEngineService.reInitAllLightMaterialsAndClearShaderCache,
        ),
        engineState,
      )
    | Some(_map) =>
      OperateTextureLogicService.changeTextureMapAndRefreshEngineState(
        materialComponent,
        textureComponent,
        LightMaterialEngineService.setLightMaterialDiffuseMap,
        engineState,
      )
    };

  let handleSelfLogic = ((store, dispatchFunc), materialComponent, dragedNodeId) =>
    MaterialDragTextureEventHandlerUtils.handleSelfLogic(
      (store, dispatchFunc),
      materialComponent,
      dragedNodeId,
      _handleSetMap,
    );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);