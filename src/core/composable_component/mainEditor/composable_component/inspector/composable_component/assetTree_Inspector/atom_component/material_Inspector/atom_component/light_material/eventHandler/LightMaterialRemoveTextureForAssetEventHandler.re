open Js.Promise;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = Wonderjs.MaterialType.material;
  type return = unit;

  let handleSelfLogic =
      ((uiState, dispatchFunc), currentNodeId, materialComponent) => {
    StateEngineService.unsafeGetState()
    |> OperateTextureLogicService.handleLightMaterialComponentFromHasDiffuseMapToNoMap(
         materialComponent,
       )
    |> StateEngineService.setState
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);