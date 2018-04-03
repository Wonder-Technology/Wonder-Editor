module MarkRedoUndoEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = string;
  let onMarkRedoUndoByLastStack = ((store, dispatch), materialComponent, value) =>
    BasicMaterialEngineService.setColor(materialComponent, [|0.4, 0.6, 0.7|])
    |> StateLogicService.getAndRefreshEngineState;
};

module MakeEventHandler = EventHandler.MakeEventHandler(MarkRedoUndoEventHandler);