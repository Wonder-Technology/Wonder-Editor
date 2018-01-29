let operateHistory = (currentState, currentStack, getNewHistoryStateFunc) =>
  switch (Immutable.Stack.first(currentStack)) {
  | Some(targetState) =>
    AllStateData.setHistoryState(getNewHistoryStateFunc());
    targetState
  | None => currentState
  };