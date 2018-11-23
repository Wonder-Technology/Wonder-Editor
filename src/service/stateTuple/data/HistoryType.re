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
  copiedRedoUndoStackRecord: option(copiedRedoUndoStackRecord),
  uiRedoStack: Stack.t(AppStore.appState),
  uiUndoStack: Stack.t(AppStore.appState),
  editorRedoStack: Stack.t(EditorType.editorState),
  editorUndoStack: Stack.t(EditorType.editorState),
  engineRedoStack: Stack.t(Wonderjs.StateDataMainType.state),
  engineUndoStack: Stack.t(Wonderjs.StateDataMainType.state),
};