open Js.Promise;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = WonderImgui.ExtendType.customImageId;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), id) =>
    StateEngineService.unsafeGetState()
    |> AssetIMGUIEngineService.removeSettedAssetCustomImageData(id)
    |> StateLogicService.renderWhenStop
    |> StateEngineService.setState
    |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);