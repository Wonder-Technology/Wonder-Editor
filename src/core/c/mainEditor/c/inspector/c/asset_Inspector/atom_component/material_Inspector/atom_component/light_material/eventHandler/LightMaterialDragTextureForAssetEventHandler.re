open Js.Promise;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = (Wonderjs.MaterialType.material, int);
  type dataTuple = TreeAssetType.tree;
  type return = unit;

  let _handleSetMap = (materialComponent, textureComponent, engineState) =>
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
          LightMaterialEngineService.reInitLightMaterialsAndClearShaderCache,
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

  let handleSelfLogic =
      (
        (uiState, dispatchFunc),
        (materialComponent, currentNodeId),
        draggedNode,
      ) => {
    MaterialDragTextureEventHandlerUtils.handleSelfLogic(
      (uiState, dispatchFunc),
      materialComponent,
      NodeAssetService.getNodeId(~node=draggedNode),
      _handleSetMap,
    );

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);