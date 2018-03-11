let storeHistoryState = (uiState, editorState, engineState, historyState) =>
  historyState
  |> UIStateHistory.storeUIState(uiState)
  |> EditorHistoryService.storeState(editorState)
  |> EngineHistoryService.storeState(engineState);

let undoHistoryState = (store, dispatch, (editorState, engineState)) => {
  dispatch(AppStore.ReplaceState(UIStateHistory.undo(AllStateData.getHistoryState(), store)));
  (
    editorState |> EditorHistoryService.undo(AllStateData.getHistoryState()),
    engineState |> EngineHistoryService.undo(AllStateData.getHistoryState())
  )
};

let redoHistoryState = (store, dispatch, (editorState, engineState)) => {
  dispatch(AppStore.ReplaceState(UIStateHistory.redo(AllStateData.getHistoryState(), store)));
  (
    editorState |> EditorHistoryService.redo(AllStateData.getHistoryState()),
    engineState |> EngineHistoryService.redo(AllStateData.getHistoryState())
  )
};