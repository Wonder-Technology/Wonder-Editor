module EmptyEventHandler = {
  let onSelect = ((store, dispatchFunc), prepareTuple, dataTuple) => ();
  let onClick = ((store, dispatchFunc), prepareTuple, dataTuple) => ();
  let onDrop = ((store, dispatchFunc), prepareTuple, dataTuple) => ();
  let onMarkRedoUndoByStackFirst =
      ((store, dispatchFunc), prepareTuple, dataTuple) =>
    ();
  let onMarkRedoUndoByStackLastReturnStore =
      ((store, dispatchFunc), prepareTuple, dataTuple) =>
    ();
  let onMarkRedoUndoByStackLastReturnStore =
      ((store, dispatchFunc), prepareTuple, dataTuple) => store;
};