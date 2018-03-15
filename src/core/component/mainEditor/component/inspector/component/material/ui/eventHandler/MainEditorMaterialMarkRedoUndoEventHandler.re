module MarkRedoUndoEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = string;
  let onMarkRedoUndo = ((store, dispatch), materialComponent, value) => {
    WonderLog.Log.print(value) |> ignore;
    BasicMaterialEngineService.setColor(materialComponent, [|0.4, 0.6, 0.7|])
    |> StateLogicService.getAndSetEngineState;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(MarkRedoUndoEventHandler);