open HistoryType;

open Immutable;

let copyHistoryStack = (store, (editorState, engineState), historyState) => {
  let engineState = engineState |> StateEngineService.deepCopyForRestore;
  AllStateData.setHistoryState({
    ...historyState,
    copiedRedoUndoStackRecord:
      Some({
        uiUndoStack: Stack.addFirst(store, historyState.uiUndoStack),
        uiRedoStack: historyState.uiRedoStack,
        editorUndoStack:
          Stack.addFirst(editorState, historyState.editorUndoStack),
        editorRedoStack: historyState.editorRedoStack,
        engineUndoStack:
          Stack.addFirst(engineState, historyState.engineUndoStack),
        engineRedoStack: historyState.engineRedoStack,
      }),
  });
};

let restoreHistoryStack =
    (dispatchFunc, (editorState, engineState, historyState)) => {
  let copiedRedoUndoStackRecord =
    historyState.copiedRedoUndoStackRecord |> OptionService.unsafeGet;

  switch (
    Stack.first(copiedRedoUndoStackRecord.uiUndoStack),
    Stack.first(copiedRedoUndoStackRecord.editorUndoStack),
    Stack.first(copiedRedoUndoStackRecord.engineUndoStack),
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
      copiedRedoUndoStackRecord: None,
      uiUndoStack:
        Stack.removeFirstOrRaise(copiedRedoUndoStackRecord.uiUndoStack),
      uiRedoStack: copiedRedoUndoStackRecord.uiRedoStack,
      editorUndoStack:
        Stack.removeFirstOrRaise(copiedRedoUndoStackRecord.editorUndoStack),
      editorRedoStack: copiedRedoUndoStackRecord.editorRedoStack,
      engineUndoStack:
        Stack.removeFirstOrRaise(copiedRedoUndoStackRecord.engineUndoStack),
      engineRedoStack: copiedRedoUndoStackRecord.engineRedoStack,
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
};