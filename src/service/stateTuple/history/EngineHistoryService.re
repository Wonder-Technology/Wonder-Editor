open HistoryType;

open Immutable;

let undo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState, historyState.engineUndoStack, () =>
    {
      ...historyState,
      engineRedoStack:
        Stack.addFirst(
          currentState |> StateEngineService.deepCopyForRestore,
          historyState.engineRedoStack,
        ),
      engineUndoStack: Stack.removeFirstOrRaise(historyState.engineUndoStack),
    }
  )
  |> StateEngineService.restoreState(currentState);

let redo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState, historyState.engineRedoStack, () =>
    {
      ...historyState,
      engineUndoStack:
        Stack.addFirst(currentState, historyState.engineUndoStack),
      engineRedoStack: Stack.removeFirstOrRaise(historyState.engineRedoStack),
    }
  )
  |> StateEngineService.restoreState(currentState);

let storeHasCopyState = (currentState, historyState) => {
  ...historyState,
  engineUndoStack: Stack.addFirst(currentState, historyState.engineUndoStack),
  engineRedoStack: Stack.empty(),
};

let storeNoCopyState = (currentState, historyState) => {
  ...historyState,
  engineUndoStack:
    Stack.addFirst(
      currentState |> StateEngineService.deepCopyForRestore,
      historyState.engineUndoStack,
    ),
  engineRedoStack: Stack.empty(),
};