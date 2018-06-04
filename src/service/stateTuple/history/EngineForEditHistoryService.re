
open HistoryType;

let undo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.engineForEditUndoStack,
    () => {
      ...historyState,
      engineForEditRedoStack:
        StackService.addFirst(
          currentState |> StateEngineService.deepCopyForRestore,
          historyState.engineForEditRedoStack
        ),
      engineForEditUndoStack: StackService.removeFirstOrRaise(historyState.engineForEditUndoStack)
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
        StackService.addFirst(
          currentState |> StateEngineService.deepCopyForRestore,
          historyState.engineForEditUndoStack
        ),
      engineForEditRedoStack: StackService.removeFirstOrRaise(historyState.engineForEditRedoStack)
    }
  )
  |> StateEngineService.restoreState(currentState);

let storeState = (currentState, historyState) => {
  ...historyState,
  engineForEditUndoStack:
    StackService.addFirst(
      currentState |> StateEngineService.deepCopyForRestore,
      historyState.engineForEditUndoStack
    ),
  engineForEditRedoStack: StackService.empty()
};