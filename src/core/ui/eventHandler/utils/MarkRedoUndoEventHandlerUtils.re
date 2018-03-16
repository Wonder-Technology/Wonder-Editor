open Immutable;

open HistoryType;

let _storeMarkRedoUndoState = (store, (editorState, engineState), historyState) => {
  let newEngineState = engineState |> StateEngineService.deepCopyForRestore;
  AllStateData.setHistoryState({
    ...historyState,
    markRedoUndoStack:
      Stack.addFirst((store, editorState, newEngineState), historyState.markRedoUndoStack)
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
  |> AllHistoryService.storeHistoryState(store, editorState, engineState)
  |> AllStateData.setHistoryState
};

let markRedoUndoChangeNothing = (historyState, store, stateTuple) =>
  switch (Stack.first(historyState.markRedoUndoStack)) {
  | Some((lastUIState, lastEditorState, lastEngineState)) =>
    _removeMarkRedoUndoFirst(historyState)
    |> AllHistoryService.storeHistoryState(lastUIState, lastEditorState, lastEngineState)
    |> _storeMarkRedoUndoState(store, stateTuple)
  | None => historyState |> _storeMarkRedoUndoState(store, stateTuple)
  };