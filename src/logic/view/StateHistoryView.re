let storeAllState = (uiState, editorState, engineState) =>
  AllStateData.getAllState()
  |> UIStateHistory.storeUIState(uiState)
  |> EditorStateView.storeEditorState(editorState)
  |> EngineStateView.storeEngineState(engineState)
  |> AllStateData.setAllState;

let allStateGoBack = (store, dispatch) => {
  EngineStateView.getEngineState()
  |> EngineStateView.goBack(AllStateData.getAllState())
  |> EngineStateView.setEngineState
  |> ignore;
  EditorStateView.getEditorState()
  |> EditorStateView.goBack(AllStateData.getAllState())
  |> EditorStateView.setEditorState
  |> ignore;
  dispatch(AppStore.ReplaceState(UIStateHistory.goBack(AllStateData.getAllState(), store)))
};

let allStateGoForward = (store, dispatch) => {
  EngineStateView.getEngineState()
  |> EngineStateView.goForward(AllStateData.getAllState())
  |> EngineStateView.setEngineState
  |> ignore;
  EditorStateView.getEditorState()
  |> EditorStateView.goForward(AllStateData.getAllState())
  |> EditorStateView.setEditorState
  |> ignore;
  dispatch(AppStore.ReplaceState(UIStateHistory.goForward(AllStateData.getAllState(), store)))
};