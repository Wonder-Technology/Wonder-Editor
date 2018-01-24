module type EventHandler = {
  type prepareTuple;
  type dataTuple;
  let onSelect:
    ((AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c), prepareTuple, dataTuple) => unit;
  let onDrop:
    ((AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c), prepareTuple, dataTuple) => unit;
  let onMarkRedoUndo:
    ((AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c), prepareTuple, dataTuple) => unit;
};

module MakeEventHandler = (EventItem: EventHandler) => {
  let _storeAllState = (store) => {
    MarkRedoUndoEventHandlerUtils.clearMarkRedoUndoStack();
    let (editorState, engineState) = MainEditorStateView.prepareState();
    StateHistoryView.storeAllState(store, editorState, engineState)
  };
  let onSelect = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    _storeAllState(store);
    EventItem.onSelect(reduxTuple, prepareTuple, dataTuple);
    _storeAllState(store)
  };
  let onDrop = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    _storeAllState(store);
    EventItem.onDrop(reduxTuple, prepareTuple, dataTuple)
  };
  let onMarkRedoUndo = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    MarkRedoUndoEventHandlerUtils.markRedoUndoEventHandler(store);
    EventItem.onMarkRedoUndo(reduxTuple, prepareTuple, dataTuple)
  };
};