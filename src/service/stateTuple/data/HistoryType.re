open Immutable;

type historyState = {
  markRedoUndoStack:
    Stack.t(
      (
        AppStore.appState,
        EditorType.editorState,
        Wonderjs.MainStateDataType.state,
        Wonderjs.MainStateDataType.state
      )
    ),
  uiRedoStack: Stack.t(AppStore.appState),
  uiUndoStack: Stack.t(AppStore.appState),
  editorRedoStack: Stack.t(EditorType.editorState),
  editorUndoStack: Stack.t(EditorType.editorState),
  engineForEditRedoStack: Stack.t(Wonderjs.MainStateDataType.state),
  engineForEditUndoStack: Stack.t(Wonderjs.MainStateDataType.state),
  engineForRunRedoStack: Stack.t(Wonderjs.MainStateDataType.state),
  engineForRunUndoStack: Stack.t(Wonderjs.MainStateDataType.state)
};