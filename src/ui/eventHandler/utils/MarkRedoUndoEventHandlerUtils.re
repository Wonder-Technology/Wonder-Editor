open Immutable;

open AllStateDataType;

let _storeMarkRedoUndoState = (uiState, allState) => {
  let (editorState, engineState) = MainEditorStateView.prepareState();
  let newEngineState = engineState |> EngineStateView.deepCopyStateForRestore;
  AllStateData.setAllState({
    ...allState,
    historyState: {
      markRedoUndoStack:
        Stack.addFirst(
          (uiState, editorState, newEngineState),
          allState.historyState.markRedoUndoStack
        )
    }
  })
};

let _removeMarkRedoUndoFirst = (allState) => {
  ...allState,
  historyState: {
    markRedoUndoStack: Stack.removeFirstOrRaise(allState.historyState.markRedoUndoStack)
  }
};

let markRedoUndoEventHandler = (allState, uiState) =>
  switch (Stack.first(allState.historyState.markRedoUndoStack)) {
  | Some((lastUIState, lastEditorState, lastEngineState)) =>
    WonderLog.Log.print(allState.historyState.markRedoUndoStack) |> ignore;
    _removeMarkRedoUndoFirst(allState)
    |> StateHistoryView.storeAllState(lastUIState, lastEditorState, lastEngineState)
    |> _storeMarkRedoUndoState(uiState)
  | None => allState |> _storeMarkRedoUndoState(uiState)
  };

let clearMarkRedoUndoStack = (allState) =>
  AllStateData.setAllState({...allState, historyState: {markRedoUndoStack: Stack.empty()}});