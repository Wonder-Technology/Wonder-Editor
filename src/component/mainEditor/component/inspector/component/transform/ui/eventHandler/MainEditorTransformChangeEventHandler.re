module ChangeEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  let onFinish = ((store, dispatch), (), ()) => WonderLog.Log.print("finish") |> ignore;
};

module MakeMainEditorTransformChangeEventHandler =
  EventHandler.MakeEventHandler(ChangeEventHandler);