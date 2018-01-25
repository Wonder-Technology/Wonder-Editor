open Immutable;

type historyStateDataType = {
  markRedoUndoStack:
    Stack.t((AppStore.appState, EditorStateDataTypeEdit.editorState, Wonderjs.StateDataType.state))
};

type uiStateDataType = {
  redoStack: Stack.t(AppStore.appState),
  undoStack: Stack.t(AppStore.appState)
};

type editorStateDataType = {
  redoStack: Stack.t(EditorStateDataTypeEdit.editorState),
  undoStack: Stack.t(EditorStateDataTypeEdit.editorState)
};

type engineStateDataType = {
  redoStack: Stack.t(Wonderjs.StateDataType.state),
  undoStack: Stack.t(Wonderjs.StateDataType.state)
};

type stateDataType = {
  historyState: historyStateDataType,
  uiState: uiStateDataType,
  editorState: editorStateDataType,
  engineState: engineStateDataType
};

type allStateDataType = {mutable allState: stateDataType};