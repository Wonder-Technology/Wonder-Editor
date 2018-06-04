
open HistoryType;

let undo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.engineForRunUndoStack,
    () => {
      ...historyState,
      engineForRunRedoStack:
        StackService.addFirst(
          currentState |> StateEngineService.deepCopyForRestore,
          historyState.engineForRunRedoStack
        ),
      engineForRunUndoStack: StackService.removeFirstOrRaise(historyState.engineForRunUndoStack)
    }
  )
  |> StateEngineService.restoreState(currentState);

let redo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.engineForRunRedoStack,
    () => {
      ...historyState,
      engineForRunUndoStack:
        StackService.addFirst(
          currentState |> StateEngineService.deepCopyForRestore,
          historyState.engineForRunUndoStack
        ),
      engineForRunRedoStack: StackService.removeFirstOrRaise(historyState.engineForRunRedoStack)
    }
  )
  |> StateEngineService.restoreState(currentState);

let storeState = (currentState, historyState) => {
  ...historyState,
  engineForRunUndoStack:
    StackService.addFirst(
      currentState |> StateEngineService.deepCopyForRestore,
      historyState.engineForRunUndoStack
    ),
  engineForRunRedoStack: StackService.empty()
};