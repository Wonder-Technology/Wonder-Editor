let storeHistoryState = (store, editorState, engineStateForEdit, engineStateForRun, historyState) =>
  historyState
  |> UIHistoryService.storeUIState(store)
  |> EditorHistoryService.storeState(editorState)
  |> EngineForEditHistoryService.storeState(engineStateForEdit)
  |> EngineForRunHistoryService.storeState(engineStateForRun);

let undoHistoryState = (store, dispatchFunc, (editorState, engineStateForEdit, engineStateForRun)) => {
  dispatchFunc(AppStore.ReplaceState(UIHistoryService.undo(AllStateData.getHistoryState(), store)));
  (
    editorState |> EditorHistoryService.undo(AllStateData.getHistoryState()),
    engineStateForEdit |> EngineForEditHistoryService.undo(AllStateData.getHistoryState()),
    engineStateForRun |> EngineForRunHistoryService.undo(AllStateData.getHistoryState())
  )
};

let redoHistoryState = (store, dispatchFunc, (editorState, engineStateForEdit, engineStateForRun)) => {
  dispatchFunc(AppStore.ReplaceState(UIHistoryService.redo(AllStateData.getHistoryState(), store)));
  (
    editorState |> EditorHistoryService.redo(AllStateData.getHistoryState()),
    engineStateForEdit |> EngineForEditHistoryService.redo(AllStateData.getHistoryState()),
    engineStateForRun |> EngineForRunHistoryService.redo(AllStateData.getHistoryState())
  )
};