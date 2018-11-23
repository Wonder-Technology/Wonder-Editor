let storeCopiedEngineHistoryState =
    (store, (editorState, engineState), historyState) => {
  let maxStackSize =
    RedoUndoSettingEditorService.unsafeGetMaxStackSize(editorState);

  historyState
  |> UIHistoryService.storeUIState(maxStackSize, store)
  |> EditorHistoryService.storeState(maxStackSize, editorState)
  |> EngineHistoryService.storeHasCopyState(maxStackSize, engineState);
};

let storeHistoryState = (store, (editorState, engineState), historyState) => {
  let maxStackSize =
    RedoUndoSettingEditorService.unsafeGetMaxStackSize(editorState);

  historyState
  |> UIHistoryService.storeUIState(maxStackSize, store)
  |> EditorHistoryService.storeState(maxStackSize, editorState)
  |> EngineHistoryService.storeNoCopyState(maxStackSize, engineState);
};

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