open Immutable;

open AllStateDataType;

let _storeMarkRedoUndoState = (uiState, (editorState, engineState), historyState) => {
  let newEngineState = engineState |> StateEngineService.deepCopyStateForRestore;
  AllStateData.setHistoryState({
    ...historyState,
    markRedoUndoStack:
      Stack.addFirst((uiState, editorState, newEngineState), historyState.markRedoUndoStack)
  })
};

let _removeMarkRedoUndoFirst = (historyState) => {
  ...historyState,
  markRedoUndoStack: Stack.removeFirstOrRaise(historyState.markRedoUndoStack)
};

let _clearMarkRedoUndoStack = (historyState) =>
  AllStateData.setHistoryState({...historyState, markRedoUndoStack: Stack.empty()});

let markRedoUndoChangeUI = (store, (editorState, engineState)) => {
  _clearMarkRedoUndoStack(AllStateData.getHistoryState());
  AllStateData.getHistoryState()
  |> StateHistoryView.storeHistoryState(store, editorState, engineState)
  |> AllStateData.setHistoryState
};

let markRedoUndoChangeNothing = (historyState, uiState, stateTuple) =>
  switch (Stack.first(historyState.markRedoUndoStack)) {
  | Some((lastUIState, lastEditorState, lastEngineState)) =>
    _removeMarkRedoUndoFirst(historyState)
    |> StateHistoryView.storeHistoryState(lastUIState, lastEditorState, lastEngineState)
    |> _storeMarkRedoUndoState(uiState, stateTuple)
  | None => historyState |> _storeMarkRedoUndoState(uiState, stateTuple)
  };