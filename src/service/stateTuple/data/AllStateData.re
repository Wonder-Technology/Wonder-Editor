open Immutable;

open HistoryType;

open AllStateDataType;

let _createHistoryState = () => {
  markRedoUndoStack: Stack.empty(),
  uiRedoStack: Stack.empty(),
  uiUndoStack: Stack.empty(),
  editorRedoStack: Stack.empty(),
  editorUndoStack: Stack.empty(),
  engineRedoStack: Stack.empty(),
  engineUndoStack: Stack.empty()
};

let allStateData = {historyState: _createHistoryState()};

let getHistoryState = () => allStateData.historyState;

let setHistoryState = (state) => allStateData.historyState = state;