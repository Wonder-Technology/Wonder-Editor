open Immutable;

open HistoryType;

let undo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.engineForEditUndoStack,
    () => {
      ...historyState,
      engineForEditRedoStack:
        Stack.addFirst(
          currentState |> StateEngineService.deepCopyForRestore,
          historyState.engineForEditRedoStack
        ),
      engineForEditUndoStack: Stack.removeFirstOrRaise(historyState.engineForEditUndoStack)
    }
  )
  |> StateEngineService.restoreState(currentState);

let redo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.engineForEditRedoStack,
    () => {
      ...historyState,
      engineForEditUndoStack:
        Stack.addFirst(
          currentState |> StateEngineService.deepCopyForRestore,
          historyState.engineForEditUndoStack
        ),
      engineForEditRedoStack: Stack.removeFirstOrRaise(historyState.engineForEditRedoStack)
    }
  )
  |> StateEngineService.restoreState(currentState);

let storeState = (currentState, historyState) => {
  ...historyState,
  engineForEditUndoStack:
    Stack.addFirst(
      currentState |> StateEngineService.deepCopyForRestore,
      historyState.engineForEditUndoStack
    ),
  engineForEditRedoStack: Stack.empty()
};