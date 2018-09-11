open Immutable;

let operateHistory = (currentState, currentStack, getNewHistoryStateFunc) =>
  switch (Stack.first(currentStack)) {
  | Some(targetState) =>
    AllStateData.setHistoryState(getNewHistoryStateFunc());
    targetState;
  | None => currentState
  };