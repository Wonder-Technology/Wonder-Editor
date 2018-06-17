module MarkRedoUndoEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  let onMarkRedoUndoByFirstStack = ((store, dispatchFunc), (), ()) => {
    dispatchFunc(AppStore.ReLoad) |> ignore;
    ();
  };
};

module MakeEventHandler =
  EventHandler.MakeEventHandler(MarkRedoUndoEventHandler);