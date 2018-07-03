module type EventHandler = {
  type prepareTuple;
  type dataTuple;
  let onSelect:
    (
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c),
      prepareTuple,
      dataTuple
    ) =>
    unit;
  let onDrop:
    (
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c),
      prepareTuple,
      dataTuple
    ) =>
    unit;
  let onClick:
    (
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c),
      prepareTuple,
      dataTuple
    ) =>
    unit;
  let onMarkRedoUndoByStackFirst:
    (
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c),
      prepareTuple,
      dataTuple
    ) =>
    unit;

  let onMarkRedoUndoByStackLastReturnStore:
    (
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c),
      prepareTuple,
      dataTuple
    ) =>
    AppStore.appState;
};

module MakeEventHandler = (EventItem: EventHandler) => {
  let onSelect = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeUI(store);

    EventItem.onSelect(reduxTuple, prepareTuple, dataTuple);
  };

  let onDrop = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeUI(store);

    EventItem.onDrop(reduxTuple, prepareTuple, dataTuple);
  };

  let onClick = ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeUI(store);

    EventItem.onClick(reduxTuple, prepareTuple, dataTuple);
  };

  let onMarkRedoUndoByStackFirst =
      ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeNothing(
         AllStateData.getHistoryState(),
         store,
       );

    EventItem.onMarkRedoUndoByStackFirst(reduxTuple, prepareTuple, dataTuple);
  };

  let onMarkRedoUndoByStackLastReturnStore =
      (reduxTuple, prepareTuple, dataTuple) => {
    let newStore =
      EventItem.onMarkRedoUndoByStackLastReturnStore(
        reduxTuple,
        prepareTuple,
        dataTuple,
      );

    StateHistoryService.getStateForHistory()
    |> MarkRedoUndoEventHandlerUtils.markRedoUndoChangeNothing(
         AllStateData.getHistoryState(),
         newStore,
       );
  };
};