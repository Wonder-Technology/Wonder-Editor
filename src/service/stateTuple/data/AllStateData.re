open HistoryType;

open AllStateDataType;

open Immutable;

let _createCopiedRedoUndoStackRecord = () => {
  uiRedoStack: Stack.empty(),
  uiUndoStack: Stack.empty(),
  editorRedoStack: Stack.empty(),
  editorUndoStack: Stack.empty(),
  engineRedoStack: Stack.empty(),
  engineUndoStack: Stack.empty(),
};

let createHistoryState = () => {
  markRedoUndoStack: Stack.empty(),
  copiedRedoUndoStackRecord: _createCopiedRedoUndoStackRecord(),
  uiRedoStack: Stack.empty(),
  uiUndoStack: Stack.empty(),
  editorRedoStack: Stack.empty(),
  editorUndoStack: Stack.empty(),
  engineRedoStack: Stack.empty(),
  engineUndoStack: Stack.empty(),
};

let allStateData = {historyState: createHistoryState()};

let getHistoryState = () => allStateData.historyState;

let setHistoryState = state => allStateData.historyState = state;