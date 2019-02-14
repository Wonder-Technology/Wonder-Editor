let _storeEngineHistoryState =
    (uiState, (editorState, engineState), storeEngineStateFunc, historyState) => {
  let maxStackSize =
    RedoUndoSettingEditorService.unsafeGetMaxStackSize(editorState);

  historyState
  |> UIHistoryService.storeUIState(maxStackSize, uiState)
  |> EditorHistoryService.storeState(maxStackSize, editorState)
  |> storeEngineStateFunc(maxStackSize, engineState);
};

let storeCopiedEngineHistoryState =
    (uiState, (editorState, engineState), historyState) =>
  _storeEngineHistoryState(
    uiState,
    (editorState, engineState),
    EngineHistoryService.storeHasCopyState,
    historyState,
  );

let storeHistoryState = (uiState, (editorState, engineState), historyState) =>
  _storeEngineHistoryState(
    uiState,
    (editorState, engineState),
    EngineHistoryService.storeNoCopyState,
    historyState,
  );

let _operateHistoryState =
    (
      uiState,
      dispatchFunc,
      (
        operateUIHistoryStateFunc,
        operateEditorHistoryStateFunc,
        operateEngineHistoryStateFunc,
      ),
      (editorState, engineState),
    ) => {
  dispatchFunc(
    AppStore.ReplaceState(
      operateUIHistoryStateFunc(AllStateData.getHistoryState(), uiState),
    ),
  );

  let editorState =
    editorState
    |> operateEditorHistoryStateFunc(AllStateData.getHistoryState());

  let engineState =
    engineState
    |> operateEngineHistoryStateFunc(AllStateData.getHistoryState());

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;

  (editorState, engineState);
};

let undoHistoryState = (uiState, dispatchFunc, (editorState, engineState)) =>
  _operateHistoryState(
    uiState,
    dispatchFunc,
    (
      UIHistoryService.undo,
      EditorHistoryService.undo,
      EngineHistoryService.undo,
    ),
    (editorState, engineState),
  );

let redoHistoryState = (uiState, dispatchFunc, (editorState, engineState)) =>
  _operateHistoryState(
    uiState,
    dispatchFunc,
    (
      UIHistoryService.redo,
      EditorHistoryService.redo,
      EngineHistoryService.redo,
    ),
    (editorState, engineState),
  );

let handleUndo = (uiState, dispatchFunc) =>
  OperateStateHistoryService.hasUndoState(AllStateData.getHistoryState()) ?
    undoHistoryState(uiState, dispatchFunc)
    |> StateHistoryService.getAndRefreshStateForHistory :
    ();