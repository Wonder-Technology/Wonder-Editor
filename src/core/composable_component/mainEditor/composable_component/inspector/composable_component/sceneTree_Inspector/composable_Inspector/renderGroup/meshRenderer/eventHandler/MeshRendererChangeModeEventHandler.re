module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = int;

  let handleSelfLogic = ((store, dispatchFunc), meshRenderer, drawMode) =>
    MeshRendererEngineService.setDrawMode(drawMode)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|meshRenderer|], type_: DiffType.MeshRenderer},
       |]);
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);