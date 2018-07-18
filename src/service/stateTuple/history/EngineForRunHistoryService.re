open HistoryType;

open Immutable;
let undo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState, historyState.engineForRunUndoStack, () =>
    {
      ...historyState,
      engineForRunRedoStack:
        Stack.addFirst(
          currentState |> StateEngineService.deepCopyForRestore,
          historyState.engineForRunRedoStack,
        ),
      engineForRunUndoStack:
        Stack.removeFirstOrRaise(historyState.engineForRunUndoStack),
    }
  )
  |> StateEngineService.restoreState(currentState);

let redo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState, historyState.engineForRunRedoStack, () =>
    {
      ...historyState,
      engineForRunUndoStack:
        Stack.addFirst(
          currentState |> StateEngineService.deepCopyForRestore,
          historyState.engineForRunUndoStack,
        ),
      engineForRunRedoStack:
        Stack.removeFirstOrRaise(historyState.engineForRunRedoStack),
    }
  )
  |> StateEngineService.restoreState(currentState);

let storeHasCopyState = (currentState, historyState) => {
  ...historyState,
  engineForRunUndoStack:
    Stack.addFirst(currentState, historyState.engineForRunUndoStack),
  engineForRunRedoStack: Stack.empty(),
};

let storeNoCopyState = (currentState, historyState) => {
  ...historyState,
  engineForRunUndoStack:
    Stack.addFirst(
      currentState |> StateEngineService.deepCopyForRestore,
      historyState.engineForRunUndoStack,
    ),
  engineForRunRedoStack: Stack.empty(),
};