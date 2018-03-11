open Immutable;


open HistoryType;
let undo = (historyState, currentState) =>
  OperateHistoryLogicService.operateHistory(
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
  OperateHistoryLogicService.operateHistory(
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
      currentState |> StateEngineService.deepCopyStateForRestore,
      historyState.engineUndoStack
    ),
  engineRedoStack: Stack.empty()
};