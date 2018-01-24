module MarkRedoUndoEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  let onMarkRedoUndo = ((store, dispatch), (), ()) => WonderLog.Log.print("finish") |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(MarkRedoUndoEventHandler);