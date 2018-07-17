let storeHistoryStateWithCopiedEngineState =
    (store, (editorState, engineStateForEdit, engineStateForRun)) =>
  AllStateData.getHistoryState()
  |> AllHistoryService.storeCopiedEngineHistoryState(
       store,
       (editorState, engineStateForEdit, engineStateForRun),
     )
  |> AllStateData.setHistoryState;

let storeHistoryStateWithNoCopyEngineState =
    (store, (editorState, engineStateForEdit, engineStateForRun)) =>
  AllStateData.getHistoryState()
  |> AllHistoryService.storeHistoryState(
       store,
       (editorState, engineStateForEdit, engineStateForRun),
     )
  |> AllStateData.setHistoryState;