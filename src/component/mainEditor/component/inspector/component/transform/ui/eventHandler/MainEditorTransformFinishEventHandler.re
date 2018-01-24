/* TODO rename to MarkRedoUndoXXX */
module FinishEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  let onFinish = ((store, dispatch), (), ()) => WonderLog.Log.print("finish") |> ignore;
};

module MakeEventHandler = EventHandler.MakeEventHandler(FinishEventHandler);