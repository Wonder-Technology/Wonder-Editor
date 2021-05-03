open Js.Promise;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (NodeAssetType.fntName, NodeAssetType.fntContent);
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), (fntName, fntContent)) =>
    StateEngineService.unsafeGetState()
    |> AssetIMGUIEngineService.setSettedAssetFntData(fntName, fntContent)
    |> StateLogicService.renderWhenStop
    |> StateEngineService.setState
    |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);