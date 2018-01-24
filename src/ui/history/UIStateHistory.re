open Immutable;

open AllStateDataType;

let goBack = (allState, currentState) =>
  switch (Stack.first(allState.uiState.undoStack)) {
  | Some(lastState) =>
    AllStateData.setAllState({
      ...allState,
      uiState: {
        redoStack: Stack.addFirst(currentState, allState.uiState.redoStack),
        undoStack: Stack.removeFirstOrRaise(allState.uiState.undoStack)
      }
    });
    lastState
  | None => currentState
  };

let goForward = (allState, currentState) =>
  switch (Stack.first(allState.uiState.redoStack)) {
  | Some(nextState) =>
    AllStateData.setAllState({
      ...allState,
      uiState: {
        undoStack: Stack.addFirst(currentState, allState.uiState.undoStack),
        redoStack: Stack.removeFirstOrRaise(allState.uiState.redoStack)
      }
    });
    nextState
  | None => currentState
  };

let storeUIState = (currentState, allState) => {
  ...allState,
  uiState: {
    undoStack: Stack.addFirst(currentState, allState.uiState.undoStack),
    redoStack: Stack.empty()
  }
};