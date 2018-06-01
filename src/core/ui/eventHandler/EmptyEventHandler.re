module EmptyEventHandler = {
  let onSelect = ((store, dispatchFunc), prepareTuple, dataTuple) => ();
  let onClick = ((store, dispatchFunc), prepareTuple, dataTuple) => ();
  let onDrop = ((store, dispatchFunc), prepareTuple, dataTuple) => ();
  let onMarkRedoUndoByFirstStack = ((store, dispatchFunc), prepareTuple, dataTuple) => ();
  let onMarkRedoUndoByLastStack = ((store, dispatchFunc), prepareTuple, dataTuple) => ();
};