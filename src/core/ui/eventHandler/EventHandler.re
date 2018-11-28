open Wonderjs;

module type EventHandler = {
  type prepareTuple;
  type dataTuple;
  type return;

  let handleSelfLogic:
    (
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c),
      prepareTuple,
      dataTuple
    ) =>
    return;

  let setUndoValueToCopiedEngineState:
    (
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c),
      prepareTuple,
      dataTuple
    ) =>
    StateDataMainType.state;
};

module MakeEventHandler = (EventItem: EventHandler) => {
  let pushUndoStackWithNoCopyEngineState =
      ((store, _) as reduxTuple, prepareTuple, dataTuple) => {
    StateHistoryService.getStateForHistory()
    |> StoreHistoryUtils.storeHistoryStateWithNoCopyEngineState(store);

    EventItem.handleSelfLogic(reduxTuple, prepareTuple, dataTuple);
  };

  let pushUndoStackWithCopiedEngineState =
      ((store, dispatchFunc) as reduxTuple, prepareTuple, dataTuple) => {
    let engineState =
      EventItem.setUndoValueToCopiedEngineState(
        reduxTuple,
        prepareTuple,
        dataTuple,
      );

    (StateEditorService.getState(), engineState)
    |> StoreHistoryUtils.storeHistoryStateWithCopiedEngineState(store);
  };
};