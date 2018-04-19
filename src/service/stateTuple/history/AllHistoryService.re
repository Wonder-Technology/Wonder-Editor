let storeHistoryState = (store, editorState, engineStateForEdit, engineStateForRun, historyState) =>
  historyState
  |> UIHistoryService.storeUIState(store)
  |> EditorHistoryService.storeState(editorState)
  |> EngineForEditHistoryService.storeState(engineStateForEdit)
  |> EngineForRunHistoryService.storeState(engineStateForRun);

let undoHistoryState = (store, dispatch, (editorState, engineStateForEdit, engineStateForRun)) => {
  dispatch(AppStore.ReplaceState(UIHistoryService.undo(AllStateData.getHistoryState(), store)));
  (
    editorState |> EditorHistoryService.undo(AllStateData.getHistoryState()),
    engineStateForEdit |> EngineForEditHistoryService.undo(AllStateData.getHistoryState()),
    engineStateForRun |> EngineForRunHistoryService.undo(AllStateData.getHistoryState())
  )
};

let redoHistoryState = (store, dispatch, (editorState, engineStateForEdit, engineStateForRun)) => {
  dispatch(AppStore.ReplaceState(UIHistoryService.redo(AllStateData.getHistoryState(), store)));
  (
    editorState |> EditorHistoryService.redo(AllStateData.getHistoryState()),
    engineStateForEdit |> EngineForEditHistoryService.redo(AllStateData.getHistoryState()),
    engineStateForRun |> EngineForRunHistoryService.redo(AllStateData.getHistoryState())
  )
};