let storeAllState = (uiState, editorState, engineState) => {
  UIStateHistory.storeUIState(uiState);
  EditorStateView.storeEditorState(editorState);
  EngineStateView.storeEngineState(engineState)
};

let allStateGoBack = (store, dispatch) => {
  /* TODO add copied engineState to future stack? or not? */
  EngineStateView.getEngineState()
  |> EngineStateView.goBack
  |> EngineStateView.setEngineState
  |> ignore;
  EditorStateView.getEditorState()
  |> EditorStateView.goBack
  |> EditorStateView.setEditorState
  |> ignore;
  dispatch(AppStore.ReplaceState(UIStateHistory.goBack(store)))
};

let allStateGoForward = (store, dispatch) => {
  EngineStateView.getEngineState()
  |> EngineStateView.goForward
  |> EngineStateView.setEngineState
  |> ignore;
  EditorStateView.getEditorState()
  |> EditorStateView.goForward
  |> EditorStateView.setEditorState
  |> ignore;
  dispatch(AppStore.ReplaceState(UIStateHistory.goForward(store)))
};