open Wonderjs;

open Js.Promise;

module type EventHandler = {
  type prepareTuple;
  type dataTuple;
  type return;

  let handleSelfLogic:
    (
      (
        AppStore.appState,
        WonderEditor.ReduxThunk.thunk(AppStore.appState) => 'a,
      ),
      prepareTuple,
      dataTuple
    ) =>
    return;

  let setUndoValueToCopiedEngineState:
    (
      (
        AppStore.appState,
        WonderEditor.ReduxThunk.thunk(AppStore.appState) => 'a,
      ),
      prepareTuple,
      dataTuple
    ) =>
    StateDataMainType.state;

  let setUndoValueToCopiedEngineStateForPromise:
    (
      (
        AppStore.appState,
        WonderEditor.ReduxThunk.thunk(AppStore.appState) => 'a,
      ),
      prepareTuple,
      dataTuple
    ) =>
    Js.Promise.t(StateDataMainType.state);
};

module MakeEventHandler = (EventItem: EventHandler) => {
  let pushUndoStackWithNoCopyEngineState =
      ((uiState, dispatchFunc) as reduxTuple, prepareTuple, dataTuple) => {
    StateHistoryService.getStateForHistory()
    |> StoreHistoryUtils.storeHistoryStateWithNoCopyEngineState(uiState);

    EventItem.handleSelfLogic(reduxTuple, prepareTuple, dataTuple);
  };

  let pushUndoStackWithCopiedEngineState =
      ((uiState, dispatchFunc) as reduxTuple, prepareTuple, dataTuple) => {
    let engineState =
      EventItem.setUndoValueToCopiedEngineState(
        reduxTuple,
        prepareTuple,
        dataTuple,
      );

    (StateEditorService.getState(), engineState)
    |> StoreHistoryUtils.storeHistoryStateWithCopiedEngineState(uiState)
    |> ignore;
  };

  let pushUndoStackWithCopiedEngineStateForPromise =
      ((uiState, dispatchFunc) as reduxTuple, prepareTuple, dataTuple) =>
    EventItem.setUndoValueToCopiedEngineStateForPromise(
      reduxTuple,
      prepareTuple,
      dataTuple,
    )
    |> then_(engineState => {
         (StateEditorService.getState(), engineState)
         |> StoreHistoryUtils.storeHistoryStateWithCopiedEngineState(uiState);

         resolve();
       });

  let pushUndoStackWithTwoHandleFunc =
      ((uiState, dispatchFunc) as reduxTuple, prepareTuple, dataTuple) => {
    let engineState =
      EventItem.setUndoValueToCopiedEngineState(
        reduxTuple,
        prepareTuple,
        dataTuple,
      );

    (StateEditorService.getState(), engineState)
    |> StoreHistoryUtils.storeHistoryStateWithCopiedEngineState(uiState)
    |> ignore;

    EventItem.handleSelfLogic(reduxTuple, prepareTuple, dataTuple);
  };
};