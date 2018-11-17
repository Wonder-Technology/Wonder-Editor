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

  let editorState =
    editorState |> EditorHistoryService.undo(AllStateData.getHistoryState());

  let engineState =
    engineState |> EngineHistoryService.undo(AllStateData.getHistoryState());

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;

  (editorState, engineState);
};

let redoHistoryState = (store, dispatchFunc, (editorState, engineState)) => {
  dispatchFunc(
    AppStore.ReplaceState(
      UIHistoryService.redo(AllStateData.getHistoryState(), store),
    ),
  );

  let editorState =
    editorState |> EditorHistoryService.redo(AllStateData.getHistoryState());
  let engineState =
    engineState |> EngineHistoryService.redo(AllStateData.getHistoryState());

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;

  (editorState, engineState);
};

let handleUndo = (store, dispatchFunc) =>
  OperateStateHistoryService.hasUndoState(AllStateData.getHistoryState()) ?
    undoHistoryState(store, dispatchFunc)
    |> StateHistoryService.getAndRefreshStateForHistory :
    ();