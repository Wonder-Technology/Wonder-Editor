open Js.Promise;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), ()) =>
    SceneEngineService.removeCubemapTexture
    |> StateLogicService.getAndSetEngineState;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);