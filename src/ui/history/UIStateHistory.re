open Immutable;

open AllStateDataType;

let undo = (historyState, currentState) =>
  HistoryStateUtils.operateHistory(
    currentState,
    historyState.uiUndoStack,
    () => {
      ...historyState,
      uiRedoStack: Stack.addFirst(currentState, historyState.uiRedoStack),
      uiUndoStack: Stack.removeFirstOrRaise(historyState.uiUndoStack)
    }
  );

let redo = (historyState, currentState) =>
  HistoryStateUtils.operateHistory(
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