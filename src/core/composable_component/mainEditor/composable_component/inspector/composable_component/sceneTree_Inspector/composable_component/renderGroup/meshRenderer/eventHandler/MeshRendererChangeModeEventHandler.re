module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = int;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), meshRenderer, drawMode) =>
    MeshRendererEngineService.setDrawMode(drawMode, meshRenderer)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);