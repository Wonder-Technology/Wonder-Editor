let storeHistoryState = (uiState, editorState, engineState, historyState) =>
  historyState
  |> UIStateHistory.storeUIState(uiState)
  |> EditorStateView.storeEditorState(editorState)
  |> EngineStateView.storeEngineState(engineState);

let undoHistoryState = (store, dispatch) => {
  EngineStateView.getEngineState()
  |> EngineStateView.undo(AllStateData.getHistoryState())
  |> EngineStateView.setEngineState
  |> ignore;
  EditorStateView.getEditorState()
  |> EditorStateView.undo(AllStateData.getHistoryState())
  |> EditorStateView.setEditorState
  |> ignore;
  dispatch(AppStore.ReplaceState(UIStateHistory.undo(AllStateData.getHistoryState(), store)))
};

let redoHistoryState = (store, dispatch) => {
  EngineStateView.getEngineState()
  |> EngineStateView.redo(AllStateData.getHistoryState())
  |> EngineStateView.setEngineState
  |> ignore;
  EditorStateView.getEditorState()
  |> EditorStateView.redo(AllStateData.getHistoryState())
  |> EditorStateView.setEditorState
  |> ignore;
  dispatch(AppStore.ReplaceState(UIStateHistory.redo(AllStateData.getHistoryState(), store)))
};