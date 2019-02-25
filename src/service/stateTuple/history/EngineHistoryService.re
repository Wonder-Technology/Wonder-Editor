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
  |> RestoreStateEngineService.restoreState(currentState);

let redo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState, historyState.engineRedoStack, () =>
    {
      ...historyState,
      engineUndoStack:
        Stack.addFirst(
          currentState |> StateEngineService.deepCopyForRestore,
          historyState.engineUndoStack,
        ),
      engineRedoStack: Stack.removeFirstOrRaise(historyState.engineRedoStack),
    }
  )
  |> RestoreStateEngineService.restoreState(currentState);

let storeHasCopyState = (maxStackSize, currentState, historyState) => {
  ...historyState,
  engineUndoStack:
    Stack.addFirst(currentState, historyState.engineUndoStack)
    |> StackHistoryService.limitStackMaxSize(maxStackSize),
  engineRedoStack: Stack.empty(),
};

let storeNoCopyState = (maxStackSize, currentState, historyState) => {
  ...historyState,
  engineUndoStack:
    Stack.addFirst(
      currentState |> StateEngineService.deepCopyForRestore,
      historyState.engineUndoStack,
    )
    |> StackHistoryService.limitStackMaxSize(maxStackSize),
  engineRedoStack: Stack.empty(),
};