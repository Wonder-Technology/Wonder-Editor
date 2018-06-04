
open HistoryType;

let undo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.uiUndoStack,
    () => {
      ...historyState,
      uiRedoStack: StackService.addFirst(currentState, historyState.uiRedoStack),
      uiUndoStack: StackService.removeFirstOrRaise(historyState.uiUndoStack)
    }
  );

let redo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.uiRedoStack,
    () => {
      ...historyState,
      uiUndoStack: StackService.addFirst(currentState, historyState.uiUndoStack),
      uiRedoStack: StackService.removeFirstOrRaise(historyState.uiRedoStack)
    }
  );

let storeUIState = (currentState, historyState) => {
  ...historyState,
  uiUndoStack: StackService.addFirst(currentState, historyState.uiUndoStack),
  uiRedoStack: StackService.empty()
};