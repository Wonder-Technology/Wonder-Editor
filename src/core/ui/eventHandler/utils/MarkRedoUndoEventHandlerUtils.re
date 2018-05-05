open Immutable;

open HistoryType;

let _storeMarkRedoUndoState =
    (store, (editorState, engineForEditState, engineForRunState), historyState) => {
  let newEngineStateForEdit = engineForEditState |> StateEngineService.deepCopyForRestore;
  let newEngineStateForRun = engineForRunState |> StateEngineService.deepCopyForRestore;
  AllStateData.setHistoryState({
    ...historyState,
    markRedoUndoStack:
      Stack.addFirst(
        (store, editorState, newEngineStateForEdit, newEngineStateForRun),
        historyState.markRedoUndoStack
      )
  })
};

let _removeMarkRedoUndoFirst = (historyState) => {
  ...historyState,
  markRedoUndoStack: Stack.removeFirstOrRaise(historyState.markRedoUndoStack)
};

let _clearMarkRedoUndoStack = (historyState) =>
  AllStateData.setHistoryState({...historyState, markRedoUndoStack: Stack.empty()});

let markRedoUndoChangeUI = (store, (editorState, engineStateForEdit, engineStateForRun)) => {
  _clearMarkRedoUndoStack(AllStateData.getHistoryState());
  AllStateData.getHistoryState()
  |> AllHistoryService.storeHistoryState(
       store,
       editorState,
       engineStateForEdit,
       engineStateForRun
     )
  |> AllStateData.setHistoryState
};

let markRedoUndoTest = (store, (editorState, engineStateForEdit, engineStateForRun)) =>
  AllStateData.getHistoryState()
  |> AllHistoryService.storeHistoryState(
       store,
       editorState,
       engineStateForEdit,
       engineStateForRun
     )
  |> AllStateData.setHistoryState;

let markRedoUndoChangeNothing = (historyState, store, stateTuple) =>
  switch (Stack.first(historyState.markRedoUndoStack)) {
  | Some((lastUIState, lastEditorState, lastEngineForEditState, lastEngineForRunState)) =>
    _removeMarkRedoUndoFirst(historyState)
    |> AllHistoryService.storeHistoryState(
         lastUIState,
         lastEditorState,
         lastEngineForEditState,
         lastEngineForRunState
       )
    |> _storeMarkRedoUndoState(store, stateTuple)
  | None => historyState |> _storeMarkRedoUndoState(store, stateTuple)
  };