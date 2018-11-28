open HistoryType;

open AllStateDataType;

open Immutable;

let createHistoryState = () => {
  copiedRedoUndoStackRecord: None,
  uiRedoStack: [],
  uiUndoStack: [],
  editorRedoStack: [],
  editorUndoStack: [],
  engineRedoStack: [],
  engineUndoStack: [],
};

let allStateData = {historyState: createHistoryState()};

let getHistoryState = () => allStateData.historyState;

let setHistoryState = state => allStateData.historyState = state;