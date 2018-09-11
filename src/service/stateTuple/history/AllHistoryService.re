let storeCopiedEngineHistoryState =
    (store, (editorState, engineState), historyState) =>
  historyState
  |> UIHistoryService.storeUIState(store)
  |> EditorHistoryService.storeState(editorState)
  |> EngineHistoryService.storeHasCopyState(engineState);

let storeHistoryState = (store, (editorState, engineState), historyState) =>
  historyState
  |> UIHistoryService.storeUIState(store)
  |> EditorHistoryService.storeState(editorState)
  |> EngineHistoryService.storeNoCopyState(engineState);

let undoHistoryState = (store, dispatchFunc, (editorState, engineState)) => {
  dispatchFunc(
    AppStore.ReplaceState(
      UIHistoryService.undo(AllStateData.getHistoryState(), store),
    ),
  );
  dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;
  (
    editorState |> EditorHistoryService.undo(AllStateData.getHistoryState()),
    engineState
    |> EngineHistoryService.undo(AllStateData.getHistoryState()),
  );
};

let redoHistoryState = (store, dispatchFunc, (editorState, engineState)) => {
  dispatchFunc(
    AppStore.ReplaceState(
      UIHistoryService.redo(AllStateData.getHistoryState(), store),
    ),
  );
  dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;
  (
    editorState |> EditorHistoryService.redo(AllStateData.getHistoryState()),
    engineState
    |> EngineHistoryService.redo(AllStateData.getHistoryState()),
  );
};