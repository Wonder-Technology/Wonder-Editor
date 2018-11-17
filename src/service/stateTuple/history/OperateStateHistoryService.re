open Immutable;

open HistoryType;

let operateHistory = (currentState, currentStack, getNewHistoryStateFunc) =>
  switch (Stack.first(currentStack)) {
  | Some(targetState) =>
    AllStateData.setHistoryState(getNewHistoryStateFunc());
    targetState;
  | None => currentState
  };

let hasHistoryState = stack => Stack.first(stack) |> Js.Option.isSome;

let hasUndoState = historyState => historyState.uiUndoStack |> hasHistoryState;

let hasRedoState = historyState => historyState.uiRedoStack |> hasHistoryState;