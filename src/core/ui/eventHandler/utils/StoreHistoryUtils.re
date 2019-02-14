let _storeHistoryState =
    (uiState, storeHistoryStateFunc, (editorState, engineState)) =>
  AllStateData.getHistoryState()
  |> storeHistoryStateFunc(uiState, (editorState, engineState))
  |> AllStateData.setHistoryState;

let storeHistoryStateWithCopiedEngineState =
    (uiState, (editorState, engineState)) =>
  _storeHistoryState(
    uiState,
    AllHistoryService.storeCopiedEngineHistoryState,
    (editorState, engineState),
  );

let storeHistoryStateWithNoCopyEngineState =
    (uiState, (editorState, engineState)) =>
  _storeHistoryState(
    uiState,
    AllHistoryService.storeHistoryState,
    (editorState, engineState),
  );