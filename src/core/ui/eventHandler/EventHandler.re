module type EventHandler = {
  type prepareTuple;
  type dataTuple;
  let onSelect:
    ((AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c), prepareTuple, dataTuple) => unit;
  let onDrop:
    ((AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c), prepareTuple, dataTuple) => unit;
  let onClick:
    ((AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c), prepareTuple, dataTuple) => unit;
  let onMarkRedoUndoByFirstStack:
    ((AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c), prepareTuple, dataTuple) => unit;
  let onMarkRedoUndoByLastStack:
    ((AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c), prepareTuple, dataTuple) => unit;
};

module MakeEventHandler = (EventItem: EventHandler) => {
  let onSelect = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeUI(store);
    EventItem.onSelect(reduxTuple, prepareTuple, dataTuple)
  };
  let onDrop = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeUI(store);
    EventItem.onDrop(reduxTuple, prepareTuple, dataTuple)
  };
  let onClick = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeUI(store);
    EventItem.onClick(reduxTuple, prepareTuple, dataTuple)
  };
  let onMarkRedoUndoByFirstStack = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeNothing(
         AllStateData.getHistoryState(),
         store
       );
    EventItem.onMarkRedoUndoByFirstStack(reduxTuple, prepareTuple, dataTuple)
  };
  let onMarkRedoUndoByLastStack = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    EventItem.onMarkRedoUndoByLastStack(reduxTuple, prepareTuple, dataTuple);
    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeNothing(
         AllStateData.getHistoryState(),
         store
       )
  };
};