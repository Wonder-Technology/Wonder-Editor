let storeCopiedEngineHistoryState =
    (
      store,
      (editorState, engineStateForEdit, engineStateForRun),
      historyState,
    ) =>
  historyState
  |> UIHistoryService.storeUIState(store)
  |> EditorHistoryService.storeState(editorState)
  |> EngineForEditHistoryService.storeHasCopyState(engineStateForEdit)
  |> EngineForRunHistoryService.storeHasCopyState(engineStateForRun);

let storeHistoryState =
    (
      store,
      (editorState, engineStateForEdit, engineStateForRun),
      historyState,
    ) =>
  historyState
  |> UIHistoryService.storeUIState(store)
  |> EditorHistoryService.storeState(editorState)
  |> EngineForEditHistoryService.storeNoCopyState(engineStateForEdit)
  |> EngineForRunHistoryService.storeNoCopyState(engineStateForRun);

let undoHistoryState =
    (
      store,
      dispatchFunc,
      (editorState, engineStateForEdit, engineStateForRun),
    ) => {
  dispatchFunc(
    AppStore.ReplaceState(
      UIHistoryService.undo(AllStateData.getHistoryState(), store),
    ),
  );
  dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;
  (
    editorState |> EditorHistoryService.undo(AllStateData.getHistoryState()),
    engineStateForEdit
    |> EngineForEditHistoryService.undo(AllStateData.getHistoryState()),
    engineStateForRun
    |> EngineForRunHistoryService.undo(AllStateData.getHistoryState()),
  );
};

let redoHistoryState =
    (
      store,
      dispatchFunc,
      (editorState, engineStateForEdit, engineStateForRun),
    ) => {
  dispatchFunc(
    AppStore.ReplaceState(
      UIHistoryService.redo(AllStateData.getHistoryState(), store),
    ),
  );
  dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;
  (
    editorState |> EditorHistoryService.redo(AllStateData.getHistoryState()),
    engineStateForEdit
    |> EngineForEditHistoryService.redo(AllStateData.getHistoryState()),
    engineStateForRun
    |> EngineForRunHistoryService.redo(AllStateData.getHistoryState()),
  );
};