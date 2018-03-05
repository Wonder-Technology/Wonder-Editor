let getEditorState = () => EditorStateSystemEdit.getState(EditorStateDataEdit.stateData);

let setEditorState = (editorState) =>
  EditorStateSystemEdit.setState(EditorStateDataEdit.stateData, editorState);

let undo = EditorStateSystemEdit.undo;

let redo = EditorStateSystemEdit.redo;

let storeEditorState = EditorStateSystemEdit.storeEditorState;