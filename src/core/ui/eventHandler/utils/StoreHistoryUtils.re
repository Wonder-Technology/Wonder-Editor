let storeHistoryStateWithCopiedEngineState =
    (store, (editorState, engineState)) =>
  AllStateData.getHistoryState()
  |> AllHistoryService.storeCopiedEngineHistoryState(
       store,
       (editorState, engineState),
     )
  |> AllStateData.setHistoryState;

let storeHistoryStateWithNoCopyEngineState =
    (store, (editorState, engineState)) =>
  AllStateData.getHistoryState()
  |> AllHistoryService.storeHistoryState(store, (editorState, engineState))
  |> AllStateData.setHistoryState;