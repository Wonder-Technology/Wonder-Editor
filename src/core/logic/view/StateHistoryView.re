let storeHistoryState = (uiState, editorState, engineState, historyState) =>
  historyState
  |> UIStateHistory.storeUIState(uiState)
  |> EditorStateFacade.storeState(editorState)
  |> EngineStateFacade.storeState(engineState);

let undoHistoryState = (store, dispatch, (editorState, engineState)) => {
  dispatch(AppStore.ReplaceState(UIStateHistory.undo(AllStateData.getHistoryState(), store)));
  (
    editorState |> EditorStateFacade.undo(AllStateData.getHistoryState()),
    engineState |> EngineStateFacade.undo(AllStateData.getHistoryState())
  )
};

let redoHistoryState = (store, dispatch, (editorState, engineState)) => {
  dispatch(AppStore.ReplaceState(UIStateHistory.redo(AllStateData.getHistoryState(), store)));
  (
    editorState |> EditorStateFacade.redo(AllStateData.getHistoryState()),
    engineState |> EngineStateFacade.redo(AllStateData.getHistoryState())
  )
};