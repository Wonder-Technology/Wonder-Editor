module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.MaterialType.material;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), materialComponent) => {
    let engineState = StateEngineService.unsafeGetState();

    OperateTextureLogicService.handleLightMaterialComponentFromHasDiffuseMapToNoMap(
      materialComponent,
      engineState,
    )
    |> StateEngineService.setState
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);