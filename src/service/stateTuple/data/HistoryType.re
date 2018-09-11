open Immutable;

type copiedRedoUndoStackRecord = {
  uiRedoStack: Stack.t(AppStore.appState),
  uiUndoStack: Stack.t(AppStore.appState),
  editorRedoStack: Stack.t(EditorType.editorState),
  editorUndoStack: Stack.t(EditorType.editorState),
  engineRedoStack: Stack.t(Wonderjs.StateDataMainType.state),
  engineUndoStack: Stack.t(Wonderjs.StateDataMainType.state),
};

type historyState = {
  markRedoUndoStack:
    Stack.t(
      (
        AppStore.appState,
        EditorType.editorState,
        Wonderjs.StateDataMainType.state,
        Wonderjs.StateDataMainType.state,
      ),
    ),
  copiedRedoUndoStackRecord,
  uiRedoStack: Stack.t(AppStore.appState),
  uiUndoStack: Stack.t(AppStore.appState),
  editorRedoStack: Stack.t(EditorType.editorState),
  editorUndoStack: Stack.t(EditorType.editorState),
  engineRedoStack: Stack.t(Wonderjs.StateDataMainType.state),
  engineUndoStack: Stack.t(Wonderjs.StateDataMainType.state),
};