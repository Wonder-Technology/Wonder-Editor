open Wonderjs;

module type EventHandler = {
  type prepareTuple;
  type dataTuple;

  let handleSelfLogic:
    (
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c),
      prepareTuple,
      dataTuple
    ) =>
    unit;

  let setUndoValueToCopiedEngineState:
    (
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('b) => 'c),
      prepareTuple,
      dataTuple
    ) =>
    (StateDataMainType.state, StateDataMainType.state);
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
    let (editEngineState, runEngineState) =
      EventItem.setUndoValueToCopiedEngineState(
        reduxTuple,
        prepareTuple,
        dataTuple,
      );

    (StateEditorService.getState(), editEngineState, runEngineState)
    |> StoreHistoryUtils.storeHistoryStateWithCopiedEngineState(store);
    /* dispatchFunc(AppStore.ReLoad) |> ignore; */
  };
};