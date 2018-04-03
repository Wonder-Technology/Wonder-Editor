/* open Immutable;

open HistoryType;

let storeControllerRedoUndo =
    (store, (editorState, engineStateForEdit, engineStateForRun), historyState) => {
  let engineStateForEdit = engineStateForEdit |> StateEngineService.deepCopyForRestore;
  let engineStateForRun = engineStateForRun |> StateEngineService.deepCopyForRestore;
  AllStateData.setHistoryState({
    ...historyState,
    controllerRedoUndoStack:
      Stack.addFirst(
        (store, editorState, engineStateForEdit, engineStateForRun),
        historyState.controllerRedoUndoStack
      )
  })
};

let _clearControllerRedoUndo = (historyState) =>
  AllStateData.setHistoryState({...historyState, controllerRedoUndoStack: Stack.empty()});

let undoController = (dispatch, engineStateForEdit, engineStateForRun, historyState) =>
  switch (Stack.first(historyState.controllerRedoUndoStack)) {
  | Some((lastUIState, lastEditorState, lastEngineStateForEdit, lastEngineStateForRun)) =>
    dispatch(AppStore.ReplaceState(lastUIState));
    (
      lastEditorState,
      lastEngineStateForEdit |> StateEngineService.restoreState(engineStateForEdit),
      lastEngineStateForRun |> StateEngineService.restoreState(engineStateForRun)
    )
    |> StateLogicService.refreshStateForHistory;
    _clearControllerRedoUndo(historyState)
  | None => ()
  }; */