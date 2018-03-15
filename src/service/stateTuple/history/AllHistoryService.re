
let storeHistoryState = (store, editorState, engineState, historyState) =>
  historyState
  |> UIHistoryService.storeUIState(store)
  |> EditorHistoryService.storeState(editorState)
  |> EngineHistoryService.storeState(engineState);

let undoHistoryState = (store, dispatch, (editorState, engineState)) => {
  dispatch(AppStore.ReplaceState(UIHistoryService.undo(AllStateData.getHistoryState(), store)));
  (
    editorState |> EditorHistoryService.undo(AllStateData.getHistoryState()),
    engineState |> EngineHistoryService.undo(AllStateData.getHistoryState())
  )
};

let redoHistoryState = (store, dispatch, (editorState, engineState)) => {
  dispatch(AppStore.ReplaceState(UIHistoryService.redo(AllStateData.getHistoryState(), store)));
  (
    editorState |> EditorHistoryService.redo(AllStateData.getHistoryState()),
    engineState |> EngineHistoryService.redo(AllStateData.getHistoryState())
  )
};