open Immutable;

open AllStateDataType;

open EditorStateDataTypeEdit;

let getState = (data) => data.state;

let setState = (data, state) => {
  data.state = state;
  state
};

let goBack = (allState, currentState) =>
  switch (Stack.first(allState.editorState.undoStack)) {
  | Some(lastState) =>
    AllStateData.setAllState({
      ...allState,
      editorState: {
        redoStack: Stack.addFirst(currentState, allState.editorState.redoStack),
        undoStack: Stack.removeFirstOrRaise(allState.editorState.undoStack)
      }
    });
    lastState
  | None => currentState
  };

let goForward = (allState, currentState) =>
  switch (Stack.first(allState.editorState.redoStack)) {
  | Some(nextState) =>
    AllStateData.setAllState({
      ...allState,
      editorState: {
        undoStack: Stack.addFirst(currentState, allState.editorState.undoStack),
        redoStack: Stack.removeFirstOrRaise(allState.editorState.redoStack)
      }
    });
    nextState
  | None => currentState
  };

let storeEditorState = (currentState, allState) => {
  ...allState,
  editorState: {
    undoStack: Stack.addFirst(currentState, allState.editorState.undoStack),
    redoStack: Stack.empty()
  }
};