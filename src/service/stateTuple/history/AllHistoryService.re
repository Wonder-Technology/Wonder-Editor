let _storeEngineHistoryState =
    (store, (editorState, engineState), storeEngineStateFunc, historyState) => {
  let maxStackSize =
    RedoUndoSettingEditorService.unsafeGetMaxStackSize(editorState);

  historyState
  |> UIHistoryService.storeUIState(maxStackSize, store)
  |> EditorHistoryService.storeState(maxStackSize, editorState)
  |> storeEngineStateFunc(maxStackSize, engineState);
};

let storeCopiedEngineHistoryState =
    (store, (editorState, engineState), historyState) =>
  _storeEngineHistoryState(
    store,
    (editorState, engineState),
    EngineHistoryService.storeHasCopyState,
    historyState,
  );

let storeHistoryState = (store, (editorState, engineState), historyState) =>
  _storeEngineHistoryState(
    store,
    (editorState, engineState),
    EngineHistoryService.storeNoCopyState,
    historyState,
  );

let _operateHistoryState =
    (
      store,
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
      operateUIHistoryStateFunc(AllStateData.getHistoryState(), store),
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

let undoHistoryState = (store, dispatchFunc, (editorState, engineState)) =>
  _operateHistoryState(
    store,
    dispatchFunc,
    (
      UIHistoryService.undo,
      EditorHistoryService.undo,
      EngineHistoryService.undo,
    ),
    (editorState, engineState),
  );

let redoHistoryState = (store, dispatchFunc, (editorState, engineState)) =>
  _operateHistoryState(
    store,
    dispatchFunc,
    (
      UIHistoryService.redo,
      EditorHistoryService.redo,
      EngineHistoryService.redo,
    ),
    (editorState, engineState),
  );

let handleUndo = (store, dispatchFunc) =>
  OperateStateHistoryService.hasUndoState(AllStateData.getHistoryState()) ?
    undoHistoryState(store, dispatchFunc)
    |> StateHistoryService.getAndRefreshStateForHistory :
    ();