open HistoryType;

open AllStateDataType;

open Immutable;

let createHistoryState = () => {
  markRedoUndoStack: Stack.empty(),
  copiedRedoUndoStackRecord: None,
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