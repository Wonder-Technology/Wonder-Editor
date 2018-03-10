open Immutable;

open AllStateDataType;

open Wonderjs;

let deepCopyStateForRestore = State.deepCopyStateForRestore;

let restoreState = State.restoreState;

let getStateData = () => StateData.stateData;

let getState = () => StateSystem.getState(getStateData());

let setState = (state) => StateSystem.setState(getStateData(), state);

let undo = (historyState, currentState) =>
  HistoryStateUtils.operateHistory(
    currentState,
    historyState.engineUndoStack,
    () => {
      ...historyState,
      engineRedoStack: Stack.addFirst(currentState, historyState.engineRedoStack),
      engineUndoStack: Stack.removeFirstOrRaise(historyState.engineUndoStack)
    }
  )
  |> restoreState(currentState);

let redo = (historyState, currentState) =>
  HistoryStateUtils.operateHistory(
    currentState,
    historyState.engineRedoStack,
    () => {
      ...historyState,
      engineUndoStack: Stack.addFirst(currentState, historyState.engineUndoStack),
      engineRedoStack: Stack.removeFirstOrRaise(historyState.engineRedoStack)
    }
  )
  |> restoreState(currentState);

let storeState = (currentState, historyState) => {
  ...historyState,
  engineUndoStack:
    Stack.addFirst(currentState |> deepCopyStateForRestore, historyState.engineUndoStack),
  engineRedoStack: Stack.empty()
};