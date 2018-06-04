
open HistoryType;

let copyHistoryStack = (store, (editorState, engineStateForEdit, engineStateForRun), historyState) => {
  let engineStateForEdit = engineStateForEdit |> StateEngineService.deepCopyForRestore;
  let engineStateForRun = engineStateForRun |> StateEngineService.deepCopyForRestore;
  AllStateData.setHistoryState({
    ...historyState,
    copiedRedoUndoStackRecord: {
      ...historyState.copiedRedoUndoStackRecord,
      uiUndoStack: StackService.addFirst(store, historyState.uiUndoStack),
      uiRedoStack: historyState.uiRedoStack,
      editorUndoStack: StackService.addFirst(editorState, historyState.editorUndoStack),
      editorRedoStack: historyState.editorRedoStack,
      engineForEditUndoStack:
        StackService.addFirst(engineStateForEdit, historyState.engineForEditUndoStack),
      engineForEditRedoStack: historyState.engineForEditRedoStack,
      engineForRunUndoStack: StackService.addFirst(engineStateForRun, historyState.engineForRunUndoStack),
      engineForRunRedoStack: historyState.engineForRunRedoStack
    }
  })
};

let restoreHistoryStack = (dispatchFunc, engineStateForEdit, engineStateForRun, historyState) =>
  switch (
    StackService.first(historyState.copiedRedoUndoStackRecord.uiUndoStack),
    StackService.first(historyState.copiedRedoUndoStackRecord.editorUndoStack),
    StackService.first(historyState.copiedRedoUndoStackRecord.engineForEditUndoStack),
    StackService.first(historyState.copiedRedoUndoStackRecord.engineForRunUndoStack)
  ) {
  | (
      Some(lastUIState),
      Some(lastEditorState),
      Some(lastEngineStateForEdit),
      Some(lastEngineStateForRun)
    ) =>
    dispatchFunc(AppStore.ReplaceState(lastUIState));
    (
      lastEditorState,
      lastEngineStateForEdit |> StateEngineService.restoreState(engineStateForEdit),
      lastEngineStateForRun |> StateEngineService.restoreState(engineStateForRun)
    )
    |> StateHistoryService.refreshStateForHistory;
    AllStateData.setHistoryState({
      ...historyState,
      uiUndoStack: StackService.removeFirstOrRaise(historyState.copiedRedoUndoStackRecord.uiUndoStack),
      uiRedoStack: historyState.copiedRedoUndoStackRecord.uiRedoStack,
      editorUndoStack:
        StackService.removeFirstOrRaise(historyState.copiedRedoUndoStackRecord.editorUndoStack),
      editorRedoStack: historyState.copiedRedoUndoStackRecord.editorRedoStack,
      engineForEditUndoStack:
        StackService.removeFirstOrRaise(historyState.copiedRedoUndoStackRecord.engineForEditUndoStack),
      engineForEditRedoStack: historyState.copiedRedoUndoStackRecord.engineForEditRedoStack,
      engineForRunUndoStack:
        StackService.removeFirstOrRaise(historyState.copiedRedoUndoStackRecord.engineForRunUndoStack),
      engineForRunRedoStack: historyState.copiedRedoUndoStackRecord.engineForRunRedoStack
    })
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="restoreHistoryStack",
        ~description={j|expect history copiedRedoUndoStackRecord undo stack have value, but not|j},
        ~reason="",
        ~solution={j|check history copiedRedoUndoStackRecord undo stack|j},
        ~params={j|historyState:$historyState|j}
      )
    )
  };