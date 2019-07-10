open Js.Promise;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = Wonderjs.CubemapTextureType.cubemapTexture;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), cubemapTexture) =>
    SceneEngineService.setCubemapTexture(cubemapTexture)
    |> StateLogicService.getAndSetEngineState;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);