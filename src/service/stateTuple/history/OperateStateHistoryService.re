let operateHistory = (currentState, currentStack, getNewHistoryStateFunc) =>
  switch (StackService.first(currentStack)) {
  | Some(targetState) =>
    AllStateData.setHistoryState(getNewHistoryStateFunc());
    targetState
  | None => currentState
  };