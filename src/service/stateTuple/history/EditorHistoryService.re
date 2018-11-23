open HistoryType;

open Immutable;
let undo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState, historyState.editorUndoStack, () =>
    {
      ...historyState,
      editorRedoStack:
        Stack.addFirst(currentState, historyState.editorRedoStack),
      editorUndoStack: Stack.removeFirstOrRaise(historyState.editorUndoStack),
    }
  );

let redo = (historyState, currentState) =>
  OperateStateHistoryService.operateHistory(
    currentState, historyState.editorRedoStack, () =>
    {
      ...historyState,
      editorUndoStack:
        Stack.addFirst(currentState, historyState.editorUndoStack),
      editorRedoStack: Stack.removeFirstOrRaise(historyState.editorRedoStack),
    }
  );

let storeState = (maxStackSize, currentState, historyState) => {
  ...historyState,
  editorUndoStack:
    Stack.addFirst(currentState, historyState.editorUndoStack)
    |> OperateStateHistoryService.limitStackMaxSize(maxStackSize),
  editorRedoStack: Stack.empty(),
};