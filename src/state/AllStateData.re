open Immutable;

open AllStateDataType;

let historyStateData = {
  markRedoUndoStack: Stack.empty(),
  uiRedoStack: Stack.empty(),
  uiUndoStack: Stack.empty(),
  editorRedoStack: Stack.empty(),
  editorUndoStack: Stack.empty(),
  engineRedoStack: Stack.empty(),
  engineUndoStack: Stack.empty()
};

let allStateData = {historyStateData: historyStateData};

let getHistoryState = () => allStateData.historyStateData;

let setHistoryState = (state) => allStateData.historyStateData = state;