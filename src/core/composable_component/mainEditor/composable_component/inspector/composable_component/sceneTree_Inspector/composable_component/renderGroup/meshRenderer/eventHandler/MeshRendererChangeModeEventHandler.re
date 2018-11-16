module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = int;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), meshRenderer, drawMode) =>
    MeshRendererEngineService.setDrawMode(drawMode, meshRenderer)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);