module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = int;
  let _handleSetMap =
      (materialGameObjects, materialComponent, mapId, engineState) =>
    switch (
      LightMaterialEngineService.getLightMaterialDiffuseMap(
        materialComponent,
        engineState,
      )
    ) {
    | None =>
      let color =
        LightMaterialEngineService.getLightMaterialDiffuseColor(
          materialComponent,
        )
        |> StateLogicService.getEngineStateToGetData;

      OperateTextureLogicService.replaceMaterialComponentFromNoMapToHasMap(
        (materialGameObjects, materialComponent, mapId),
        color,
        (
          GameObjectComponentEngineService.removeLightMaterialComponent,
          OperateLightMaterialLogicService.setLightMaterialColor,
          OperateLightMaterialLogicService.createLightMaterial,
          OperateLightMaterialLogicService.addLightMaterial,
        ),
        OperateLightMaterialLogicService.setLightMaterialMapToEngineState,
        engineState,
      );

    | Some(_map) =>
      OperateTextureLogicService.changeTextureMapAndRereshEngineState(
        materialComponent,
        mapId,
        OperateLightMaterialLogicService.setLightMaterialMapToEngineState,
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