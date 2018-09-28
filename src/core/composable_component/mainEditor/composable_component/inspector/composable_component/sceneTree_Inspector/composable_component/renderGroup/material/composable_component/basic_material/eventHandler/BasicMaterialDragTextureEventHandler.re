module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = int;
  let _handleSetMap =
      (materialGameObjects, materialComponent, mapId, engineState) =>
    switch (
      BasicMaterialEngineService.getBasicMaterialMap(
        materialComponent,
        engineState,
      )
    ) {
    | None =>
      let color =
        BasicMaterialEngineService.getColor(materialComponent, engineState);

      OperateTextureLogicService.replaceMaterialComponentFromNoMapToHasMap(
        (materialGameObjects, materialComponent, mapId),
        color,
        (
          GameObjectComponentEngineService.removeBasicMaterialComponent,
          OperateBasicMaterialLogicService.setBasicMaterialColor,
          OperateBasicMaterialLogicService.createBasicMaterial,
          OperateBasicMaterialLogicService.addBasicMaterial,
        ),
        OperateBasicMaterialLogicService.setBasicMaterialMapToEngineState,
        engineState,
      );

    | Some(_map) =>
      OperateTextureLogicService.changeTextureMapAndRefreshEngineState(
        materialComponent,
        mapId,
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