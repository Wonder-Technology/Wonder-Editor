open Immutable;

open AllStateDataType;

let stateData = {
  historyState: {markRedoUndoStack: Stack.empty()},
  uiState: {redoStack: Stack.empty(), undoStack: Stack.empty()},
  editorState: {redoStack: Stack.empty(), undoStack: Stack.empty()},
  engineState: {redoStack: Stack.empty(), undoStack: Stack.empty()}
};

let allStateData = {allState: stateData};

let getAllState = () => allStateData.allState;

let setAllState = (state) => allStateData.allState = state;