open Js.Promise;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (string, Js.Typed_array.ArrayBuffer.t);
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), (name, arrayBuffer)) =>
    StateEngineService.unsafeGetState()
    |> AssetIMGUIEngineService.setSettedAssetBitmapData(name, arrayBuffer)
    |> StateLogicService.renderWhenStop
    |> StateEngineService.setState
    |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);