open Immutable;

open AllStateDataType;

open EditorStateDataTypeEdit;

let getState = (data) => data.state;

let setState = (data, state) => {
  data.state = state;
  state
};

let undo = (historyState, currentState) =>
  HistoryStateUtils.operateHistory(
    currentState,
    historyState.editorUndoStack,
    () => {
      ...historyState,
      editorRedoStack: Stack.addFirst(currentState, historyState.editorRedoStack),
      editorUndoStack: Stack.removeFirstOrRaise(historyState.editorUndoStack)
    }
  );

let redo = (historyState, currentState) =>
  HistoryStateUtils.operateHistory(
    currentState,
    historyState.editorRedoStack,
    () => {
      ...historyState,
      editorUndoStack: Stack.addFirst(currentState, historyState.editorUndoStack),
      editorRedoStack: Stack.removeFirstOrRaise(historyState.editorRedoStack)
    }
  );

let storeEditorState = (currentState, historyState) => {
  ...historyState,
  editorUndoStack: Stack.addFirst(currentState, historyState.editorUndoStack),
  editorRedoStack: Stack.empty()
};