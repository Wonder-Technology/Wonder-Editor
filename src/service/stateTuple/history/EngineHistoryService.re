open Immutable;


open HistoryType;
let undo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.engineUndoStack,
    () => {
      ...historyState,
      engineRedoStack: Stack.addFirst(currentState, historyState.engineRedoStack),
      engineUndoStack: Stack.removeFirstOrRaise(historyState.engineUndoStack)
    }
  )
  |> StateEngineService.restoreState(currentState);

let redo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState,
    historyState.engineRedoStack,
    () => {
      ...historyState,
      engineUndoStack: Stack.addFirst(currentState, historyState.engineUndoStack),
      engineRedoStack: Stack.removeFirstOrRaise(historyState.engineRedoStack)
    }
  )
  |> StateEngineService.restoreState(currentState);

let storeState = (currentState, historyState) => {
  ...historyState,
  engineUndoStack:
    Stack.addFirst(
      currentState |> StateEngineService.deepCopyForRestore,
      historyState.engineUndoStack
    ),
  engineRedoStack: Stack.empty()
};