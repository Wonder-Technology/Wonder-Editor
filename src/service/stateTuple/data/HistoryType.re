
type copiedRedoUndoStackRecord = {
  uiRedoStack: StackService.t(AppStore.appState),
  uiUndoStack: StackService.t(AppStore.appState),
  editorRedoStack: StackService.t(EditorType.editorState),
  editorUndoStack: StackService.t(EditorType.editorState),
  engineForEditRedoStack: StackService.t(Wonderjs.StateDataMainType.state),
  engineForEditUndoStack: StackService.t(Wonderjs.StateDataMainType.state),
  engineForRunRedoStack: StackService.t(Wonderjs.StateDataMainType.state),
  engineForRunUndoStack: StackService.t(Wonderjs.StateDataMainType.state)
};

type historyState = {
  markRedoUndoStack:
    StackService.t(
      (
        AppStore.appState,
        EditorType.editorState,
        Wonderjs.StateDataMainType.state,
        Wonderjs.StateDataMainType.state
      )
    ),
  copiedRedoUndoStackRecord,
  uiRedoStack: StackService.t(AppStore.appState),
  uiUndoStack: StackService.t(AppStore.appState),
  editorRedoStack: StackService.t(EditorType.editorState),
  editorUndoStack: StackService.t(EditorType.editorState),
  engineForEditRedoStack: StackService.t(Wonderjs.StateDataMainType.state),
  engineForEditUndoStack: StackService.t(Wonderjs.StateDataMainType.state),
  engineForRunRedoStack: StackService.t(Wonderjs.StateDataMainType.state),
  engineForRunUndoStack: StackService.t(Wonderjs.StateDataMainType.state)
};