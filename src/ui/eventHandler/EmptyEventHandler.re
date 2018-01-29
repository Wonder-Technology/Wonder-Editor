module EmptyEventHandler = {
  let onSelect = ((store, dispatch), prepareTuple, dataTuple) => ();
  let onDrop = ((store, dispatch), prepareTuple, dataTuple) => ();
  let onMarkRedoUndo = ((store, dispatch), prepareTuple, dataTuple) => ();
};