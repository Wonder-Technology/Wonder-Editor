open Immutable;

open AllStateDataType;

/* open EditorStateDataTypeEdit; */
open EditorStateDataType;

open EditorType;

let editorState = {sceneRecord: {root: None, currentGameObject: None}};

let stateData = {state: editorState, isDebug: true};

let getStateIsDebug = () => stateData.isDebug;

let getState = () => stateData.state;

let setState = (state) => {
  stateData.state = state;
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

let storeState = (currentState, historyState) => {
  ...historyState,
  editorUndoStack: Stack.addFirst(currentState, historyState.editorUndoStack),
  editorRedoStack: Stack.empty()
};