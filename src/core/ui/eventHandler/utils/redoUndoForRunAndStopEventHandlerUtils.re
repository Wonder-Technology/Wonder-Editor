open Immutable;

open HistoryType;

let storeRedoUndoForRunAndStop =
    (store, (editorState, engineStateForEdit, engineStateForRun), historyState) => {
  let newEngineStateForEdit = engineStateForEdit |> StateEngineService.deepCopyForRestore;
  let newEngineStateForRun = engineStateForRun |> StateEngineService.deepCopyForRestore; 
  WonderLog.Log.print("store run and stop") |> ignore;
  /* TODO remove other stack */
  AllStateData.setHistoryState({
    ...historyState,
    controllerRedoUndoStack:
      Stack.addFirst(
        (store, editorState, newEngineStateForEdit, newEngineStateForRun),
        historyState.controllerRedoUndoStack
      )
  });
  WonderLog.Log.print(AllStateData.getHistoryState().controllerRedoUndoStack) |> ignore
};

let _removeRedoUndoForRunAndStop = (historyState) => {
  ...historyState,
  controllerRedoUndoStack: Stack.removeFirstOrRaise(historyState.controllerRedoUndoStack)
};

let _clearRedoUndoForRunAndStopStack = (historyState) =>
  AllStateData.setHistoryState({...historyState, controllerRedoUndoStack: Stack.empty()});

let undo = (dispatch, engineStateForEdit, engineStateForRun, historyState) => {
  WonderLog.Log.print(AllStateData.getHistoryState().controllerRedoUndoStack) |> ignore;
  switch (Stack.first(historyState.controllerRedoUndoStack)) {
  | Some((lastUIState, lastEditorState, lastEngineStateForEdit, lastEngineStateForRun)) =>
    dispatch(AppStore.ReplaceState(lastUIState));
    (
      lastEditorState,
      lastEngineStateForEdit |> StateEngineService.restoreState(engineStateForEdit),
      lastEngineStateForRun |> StateEngineService.restoreState(engineStateForRun)
    )
    |> StateLogicService.refreshStateForHistory;
    _clearRedoUndoForRunAndStopStack(historyState)
  | None => ()
  }
};