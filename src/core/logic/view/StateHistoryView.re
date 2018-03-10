let storeHistoryState = (uiState, editorState, engineState, historyState) =>
  historyState
  |> UIStateHistory.storeUIState(uiState)
  |> StateEditorService.storeState(editorState)
  |> StateEngineService.storeState(engineState);

let undoHistoryState = (store, dispatch, (editorState, engineState)) => {
  dispatch(AppStore.ReplaceState(UIStateHistory.undo(AllStateData.getHistoryState(), store)));
  (
    editorState |> StateEditorService.undo(AllStateData.getHistoryState()),
    engineState |> StateEngineService.undo(AllStateData.getHistoryState())
  )
};

let redoHistoryState = (store, dispatch, (editorState, engineState)) => {
  dispatch(AppStore.ReplaceState(UIStateHistory.redo(AllStateData.getHistoryState(), store)));
  (
    editorState |> StateEditorService.redo(AllStateData.getHistoryState()),
    engineState |> StateEngineService.redo(AllStateData.getHistoryState())
  )
};