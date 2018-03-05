open Immutable;

type historyStateDataType = {
  markRedoUndoStack:
    Stack.t(
      (AppStore.appState, EditorStateDataTypeEdit.editorState, Wonderjs.StateDataType.state)
    ),
  uiRedoStack: Stack.t(AppStore.appState),
  uiUndoStack: Stack.t(AppStore.appState),
  editorRedoStack: Stack.t(EditorStateDataTypeEdit.editorState),
  editorUndoStack: Stack.t(EditorStateDataTypeEdit.editorState),
  engineRedoStack: Stack.t(Wonderjs.StateDataType.state),
  engineUndoStack: Stack.t(Wonderjs.StateDataType.state)
};

type allStateDataType = {mutable historyStateData: historyStateDataType};