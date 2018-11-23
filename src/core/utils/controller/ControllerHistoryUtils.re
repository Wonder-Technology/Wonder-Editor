open HistoryType;

open Immutable;

let copyHistoryStack = (store, (editorState, engineState), historyState) => {
  let engineState = engineState |> StateEngineService.deepCopyForRestore;
  AllStateData.setHistoryState({
    ...historyState,
    copiedRedoUndoStackRecord: {
      ...historyState.copiedRedoUndoStackRecord,
      uiUndoStack: Stack.addFirst(store, historyState.uiUndoStack),
      uiRedoStack: historyState.uiRedoStack,
      editorUndoStack:
        Stack.addFirst(editorState, historyState.editorUndoStack),
      editorRedoStack: historyState.editorRedoStack,
      engineUndoStack:
        Stack.addFirst(engineState, historyState.engineUndoStack),
      engineRedoStack: historyState.engineRedoStack,
    },
  });
};

/* TODO set to None */
let restoreHistoryStack =
    (dispatchFunc, (editorState, engineState, historyState)) =>
  switch (
    Stack.first(historyState.copiedRedoUndoStackRecord.uiUndoStack),
    Stack.first(historyState.copiedRedoUndoStackRecord.editorUndoStack),
    Stack.first(historyState.copiedRedoUndoStackRecord.engineUndoStack),
  ) {
  | (Some(lastUIState), Some(lastEditorState), Some(lastEngineState)) =>
    dispatchFunc(AppStore.ReplaceState(lastUIState));
    /* TODO after restore */
    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])))
    |> ignore;

    (
      lastEditorState,
      lastEngineState |> StateEngineService.restoreState(engineState),
    )
    |> StateHistoryService.refreshStateForHistory;
    AllStateData.setHistoryState({
      ...historyState,
      uiUndoStack:
        Stack.removeFirstOrRaise(
          historyState.copiedRedoUndoStackRecord.uiUndoStack,
        ),
      uiRedoStack: historyState.copiedRedoUndoStackRecord.uiRedoStack,
      editorUndoStack:
        Stack.removeFirstOrRaise(
          historyState.copiedRedoUndoStackRecord.editorUndoStack,
        ),
      editorRedoStack: historyState.copiedRedoUndoStackRecord.editorRedoStack,
      engineUndoStack:
        Stack.removeFirstOrRaise(
          historyState.copiedRedoUndoStackRecord.engineUndoStack,
        ),
      engineRedoStack: historyState.copiedRedoUndoStackRecord.engineRedoStack,
    });
  | _ =>
    ConsoleUtils.error(
      LogUtils.buildErrorMessage(
        ~description=
          {j|expect history copiedRedoUndoStackRecord undo stack have value, but not|j},
        ~reason="",
        ~solution={j|check history copiedRedoUndoStackRecord undo stack|j},
        ~params={j|historyState:$historyState|j},
      ),
      editorState,
    );

    ();
  };