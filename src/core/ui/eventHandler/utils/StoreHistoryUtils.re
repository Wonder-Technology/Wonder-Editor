let _storeHistoryState =
    (store, storeHistoryStateFunc, (editorState, engineState)) =>
  AllStateData.getHistoryState()
  |> storeHistoryStateFunc(store, (editorState, engineState))
  |> AllStateData.setHistoryState;

let storeHistoryStateWithCopiedEngineState =
    (store, (editorState, engineState)) =>
  _storeHistoryState(
    store,
    AllHistoryService.storeCopiedEngineHistoryState,
    (editorState, engineState),
  );

let storeHistoryStateWithNoCopyEngineState =
    (store, (editorState, engineState)) =>
  _storeHistoryState(
    store,
    AllHistoryService.storeHistoryState,
    (editorState, engineState),
  );