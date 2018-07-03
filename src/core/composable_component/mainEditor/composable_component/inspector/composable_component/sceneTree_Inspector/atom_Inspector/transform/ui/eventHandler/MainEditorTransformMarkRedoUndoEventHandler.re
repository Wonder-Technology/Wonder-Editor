module MarkRedoUndoEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  let onMarkRedoUndoByStackFirst = ((store, dispatchFunc), (), ()) => {
    dispatchFunc(AppStore.ReLoad) |> ignore;
    ();
  };
};

module MakeEventHandler =
  EventHandler.MakeEventHandler(MarkRedoUndoEventHandler);