open Immutable;

type historyState = {
  markRedoUndoStack:
    Stack.t((AppStore.appState, EditorType.editorState, Wonderjs.MainStateDataType.state)),
  uiRedoStack: Stack.t(AppStore.appState),
  uiUndoStack: Stack.t(AppStore.appState),
  editorRedoStack: Stack.t(EditorType.editorState),
  editorUndoStack: Stack.t(EditorType.editorState),
  engineRedoStack: Stack.t(Wonderjs.MainStateDataType.state),
  engineUndoStack: Stack.t(Wonderjs.MainStateDataType.state)
};