open Immutable;

open AllStateDataType;

open EditorStateDataType;

let getStateIsDebug = () => EditorStateData.editorStateData.isDebug;

let getState = () => EditorStateData.editorStateData.state;

let setState = (state) => {
  EditorStateData.editorStateData.state = state;
  state
};

/* TODO move to tuple: EditorHistoryService.re */
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

let storeState = (currentState, historyState) => {
  ...historyState,
  editorUndoStack: Stack.addFirst(currentState, historyState.editorUndoStack),
  editorRedoStack: Stack.empty()
};