
open HistoryType;
open Immutable;

let undo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.uiUndoStack,
    () => {
      ...historyState,
      uiRedoStack: Stack.addFirst(currentState, historyState.uiRedoStack),
      uiUndoStack: Stack.removeFirstOrRaise(historyState.uiUndoStack)
    }
  );

let redo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.uiRedoStack,
    () => {
      ...historyState,
      uiUndoStack: Stack.addFirst(currentState, historyState.uiUndoStack),
      uiRedoStack: Stack.removeFirstOrRaise(historyState.uiRedoStack)
    }
  );

let storeUIState = (currentState, historyState) => {
  ...historyState,
  uiUndoStack: Stack.addFirst(currentState, historyState.uiUndoStack),
  uiRedoStack: Stack.empty()
};