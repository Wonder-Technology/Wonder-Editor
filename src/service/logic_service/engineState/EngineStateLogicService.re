
open Immutable;

open AllStateDataType;

let deepCopyStateForRestore = EngineStateCommonService.deepCopyStateForRestore;

let restoreState = EngineStateCommonService.restoreState;

let getState = () => EngineStateCommonService.getState(EngineStateCommonService.getStateData());

let setState = (state) => EngineStateCommonService.setState(EngineStateCommonService.getStateData(), state);

let undo = (historyState, currentState) =>
  HistoryStateUtils.operateHistory(
    currentState,
    historyState.engineUndoStack,
    () => {
      ...historyState,
      engineRedoStack: Stack.addFirst(currentState, historyState.engineRedoStack),
      engineUndoStack: Stack.removeFirstOrRaise(historyState.engineUndoStack)
    }
  );

let redo = (historyState, currentState) =>
  HistoryStateUtils.operateHistory(
    currentState,
    historyState.engineRedoStack,
    () => {
      ...historyState,
      engineUndoStack: Stack.addFirst(currentState, historyState.engineUndoStack),
      engineRedoStack: Stack.removeFirstOrRaise(historyState.engineRedoStack)
    }
  );

let storeEngineState = (currentState, historyState) => {
  ...historyState,
  engineUndoStack: Stack.addFirst(currentState, historyState.engineUndoStack),
  engineRedoStack: Stack.empty()
};
