module type EventHandler = {
  type prepareTuple;
  type dataTuple;
  let onSelect:
    ((AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c), prepareTuple, dataTuple) => unit;
  let onDrag:
    ((AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c), prepareTuple, dataTuple) => unit;
  let onChange:
    ((AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c), prepareTuple, dataTuple) => unit;
};

module MakeEventHandler = (EventItem: EventHandler) => {
  let _storeAllState = (store) => {
    let (editorState, engineState) = MainEditorStateView.prepareState();
    StateHistoryView.storeAllState(store, editorState, engineState)
  };
  let onSelect = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    _storeAllState(store);
    EventItem.onSelect(reduxTuple, prepareTuple, dataTuple)
  };
  let onDrag = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    _storeAllState(store);
    EventItem.onDrag(reduxTuple, prepareTuple, dataTuple)
  };
  let onChange = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    _storeAllState(store);
    EventItem.onChange(reduxTuple, prepareTuple, dataTuple)
  };
};