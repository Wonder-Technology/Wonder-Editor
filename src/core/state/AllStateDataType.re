open Immutable;

type historyStateDataType = {
  markRedoUndoStack:
    Stack.t(
      (AppStore.appState, EditorType.editorState, Wonderjs.StateDataType.state)
    ),
  uiRedoStack: Stack.t(AppStore.appState),
  uiUndoStack: Stack.t(AppStore.appState),
  editorRedoStack: Stack.t(EditorType.editorState),
  editorUndoStack: Stack.t(EditorType.editorState),
  engineRedoStack: Stack.t(Wonderjs.StateDataType.state),
  engineUndoStack: Stack.t(Wonderjs.StateDataType.state)
};

type allStateDataType = {mutable historyStateData: historyStateDataType};