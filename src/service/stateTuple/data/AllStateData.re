
open HistoryType;

open AllStateDataType;

let _createCopiedRedoUndoStackRecord = () => {
  uiRedoStack: StackService.empty(),
  uiUndoStack: StackService.empty(),
  editorRedoStack: StackService.empty(),
  editorUndoStack: StackService.empty(),
  engineForEditRedoStack: StackService.empty(),
  engineForEditUndoStack: StackService.empty(),
  engineForRunRedoStack: StackService.empty(),
  engineForRunUndoStack: StackService.empty()
};

let _createHistoryState = () => {
  markRedoUndoStack: StackService.empty(),
  copiedRedoUndoStackRecord: _createCopiedRedoUndoStackRecord(),
  uiRedoStack: StackService.empty(),
  uiUndoStack: StackService.empty(),
  editorRedoStack: StackService.empty(),
  editorUndoStack: StackService.empty(),
  engineForEditRedoStack: StackService.empty(),
  engineForEditUndoStack: StackService.empty(),
  engineForRunRedoStack: StackService.empty(),
  engineForRunUndoStack: StackService.empty()
};

let allStateData = {historyState: _createHistoryState()};

let getHistoryState = () => allStateData.historyState;

let setHistoryState = (state) => allStateData.historyState = state;