module MarkRedoUndoEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  let onMarkRedoUndoByFirstStack = ((store, dispatchFunc), (), ()) =>
    WonderLog.Log.print("finish") |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(MarkRedoUndoEventHandler);