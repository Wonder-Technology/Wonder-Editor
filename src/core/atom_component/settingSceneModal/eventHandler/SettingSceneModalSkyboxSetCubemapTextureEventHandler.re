open Js.Promise;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.CubemapTextureType.cubemapTexture;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), cubemapTexture) =>
    StateEngineService.unsafeGetState()
    |> SceneEngineService.setCubemapTexture(cubemapTexture)
    |> StateLogicService.renderWhenStop
    |> StateEngineService.setState
    |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);