module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.MaterialType.material;

  let handleSelfLogic = ((store, dispatchFunc), (), materialComponent) => {
    let engineState = StateEngineService.unsafeGetState();

    OperateTextureLogicService.handleBasicMaterialComponentFromHasMapToNoMap(
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