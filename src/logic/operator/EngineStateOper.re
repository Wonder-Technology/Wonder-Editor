open Immutable;

open AllStateDataType;

let deepCopyStateForRestore = EngineStateAdaptor.deepCopyStateForRestore;

let restoreState = EngineStateAdaptor.restoreState;

let getState = () => EngineStateAdaptor.getState(EngineStateAdaptor.getStateData());

let setState = (state) => EngineStateAdaptor.setState(EngineStateAdaptor.getStateData(), state);

let goBack = (allState, currentState) =>
  switch (Stack.first(allState.engineState.undoStack)) {
  | Some(lastState) =>
    AllStateData.setAllState({
      ...allState,
      engineState: {
        redoStack: Stack.addFirst(currentState, allState.engineState.redoStack),
        undoStack: Stack.removeFirstOrRaise(allState.engineState.undoStack)
      }
    });
    lastState
  | None => currentState
  };

let goForward = (allState, currentState) =>
  switch (Stack.first(allState.engineState.redoStack)) {
  | Some(nextState) =>
    AllStateData.setAllState({
      ...allState,
      engineState: {
        undoStack: Stack.addFirst(currentState, allState.engineState.undoStack),
        redoStack: Stack.removeFirstOrRaise(allState.engineState.redoStack)
      }
    });
    nextState
  | None => currentState
  };

let storeEngineState = (currentState, allState) => {
  ...allState,
  engineState: {
    undoStack: Stack.addFirst(currentState, allState.engineState.undoStack),
    redoStack: Stack.empty()
  }
};