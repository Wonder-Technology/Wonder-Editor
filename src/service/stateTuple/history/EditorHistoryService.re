
open HistoryType;

let undo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.editorUndoStack,
    () => {
      ...historyState,
      editorRedoStack: StackService.addFirst(currentState, historyState.editorRedoStack),
      editorUndoStack: StackService.removeFirstOrRaise(historyState.editorUndoStack)
    }
  );

let redo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.editorRedoStack,
    () => {
      ...historyState,
      editorUndoStack: StackService.addFirst(currentState, historyState.editorUndoStack),
      editorRedoStack: StackService.removeFirstOrRaise(historyState.editorRedoStack)
    }
  );

let storeState = (currentState, historyState) => {
  ...historyState,
  editorUndoStack: StackService.addFirst(currentState, historyState.editorUndoStack),
  editorRedoStack: StackService.empty()
};