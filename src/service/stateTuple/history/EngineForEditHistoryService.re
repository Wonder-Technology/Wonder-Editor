open HistoryType;

open Immutable;
let undo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState, historyState.engineForEditUndoStack, () =>
    {
      ...historyState,
      engineForEditRedoStack:
        Stack.addFirst(
          currentState |> StateEngineService.deepCopyForRestore,
          historyState.engineForEditRedoStack,
        ),
      engineForEditUndoStack:
        Stack.removeFirstOrRaise(historyState.engineForEditUndoStack),
    }
  )
  |> StateEngineService.restoreState(currentState);

let redo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState, historyState.engineForEditRedoStack, () =>
    {
      ...historyState,
      engineForEditUndoStack:
        Stack.addFirst(
          currentState |> StateEngineService.deepCopyForRestore,
          historyState.engineForEditUndoStack,
        ),
      engineForEditRedoStack:
        Stack.removeFirstOrRaise(historyState.engineForEditRedoStack),
    }
  )
  |> StateEngineService.restoreState(currentState);

let storeHasCopyState = (currentState, historyState) => {
  ...historyState,
  engineForEditUndoStack:
    Stack.addFirst(currentState, historyState.engineForEditUndoStack),
  engineForEditRedoStack: Stack.empty(),
};

let storeNoCopyState = (currentState, historyState) => {
  ...historyState,
  engineForEditUndoStack:
    Stack.addFirst(
      currentState |> StateEngineService.deepCopyForRestore,
      historyState.engineForEditUndoStack,
    ),
  engineForEditRedoStack: Stack.empty(),
};