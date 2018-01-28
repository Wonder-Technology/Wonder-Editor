open Immutable;

open AllStateDataType;

let _storeMarkRedoUndoState = (uiState, historyState) => {
  let (editorState, engineState) = MainEditorStateView.prepareState();
  let newEngineState = engineState |> EngineStateView.deepCopyStateForRestore;
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

let markRedoUndoChangeUI = (store) => {
  _clearMarkRedoUndoStack(AllStateData.getHistoryState());
  let (editorState, engineState) = MainEditorStateView.prepareState();
  AllStateData.getHistoryState()
  |> StateHistoryView.storeHistoryState(store, editorState, engineState)
  |> AllStateData.setHistoryState
};

let markRedoUndoChangeNothing = (historyState, uiState) =>
  switch (Stack.first(historyState.markRedoUndoStack)) {
  | Some((lastUIState, lastEditorState, lastEngineState)) =>
    _removeMarkRedoUndoFirst(historyState)
    |> StateHistoryView.storeHistoryState(lastUIState, lastEditorState, lastEngineState)
    |> _storeMarkRedoUndoState(uiState)
  | None => historyState |> _storeMarkRedoUndoState(uiState)
  };