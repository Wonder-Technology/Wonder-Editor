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

let hasUndoState = historyState => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|all history state stack should has the same length|j},
                ~actual={j|not|j},
              ),
              () => {
                historyState.uiUndoStack
                |> Stack.count == (historyState.editorUndoStack |> Stack.count);
                historyState.uiUndoStack
                |> Stack.count == (historyState.engineUndoStack |> Stack.count);
              },
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  historyState.uiUndoStack |> hasHistoryState;
};

let hasRedoState = historyState => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|all history state stack should has the same length|j},
                ~actual={j|not|j},
              ),
              () => {
                historyState.uiRedoStack
                |> Stack.count == (historyState.editorRedoStack |> Stack.count);
                historyState.uiRedoStack
                |> Stack.count == (historyState.engineRedoStack |> Stack.count);
              },
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  historyState.uiRedoStack |> hasHistoryState;
};