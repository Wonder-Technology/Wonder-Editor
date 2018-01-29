let storeHistoryState = (uiState, editorState, engineState, historyState) =>
  historyState
  |> UIStateHistory.storeUIState(uiState)
  |> EditorStateView.storeEditorState(editorState)
  |> EngineStateView.storeEngineState(engineState);

let _historyEngineState = (operateHistoryFunc) =>
  EngineStateView.getEngineState()
  |> operateHistoryFunc
  |> EngineStateView.setEngineState
  |> ignore;

let _historyEditorState = (operateHistoryFunc) =>
  EditorStateView.getEditorState()
  |> operateHistoryFunc
  |> EditorStateView.setEditorState
  |> ignore;

let undoHistoryState = (store, dispatch) => {
  _historyEngineState(EngineStateView.undo(AllStateData.getHistoryState()));
  _historyEditorState(EditorStateView.undo(AllStateData.getHistoryState()));
  dispatch(AppStore.ReplaceState(UIStateHistory.undo(AllStateData.getHistoryState(), store)))
};

let redoHistoryState = (store, dispatch) => {
  _historyEngineState(EngineStateView.redo(AllStateData.getHistoryState()));
  _historyEditorState(EditorStateView.redo(AllStateData.getHistoryState()));
  dispatch(AppStore.ReplaceState(UIStateHistory.redo(AllStateData.getHistoryState(), store)))
};