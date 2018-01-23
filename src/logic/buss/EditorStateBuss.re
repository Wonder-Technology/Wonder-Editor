let getEditorState = () => EditorStateSystemEdit.getState(EditorStateDataEdit.stateData);

let setEditorState = (editorState) =>
  EditorStateSystemEdit.setState(EditorStateDataEdit.stateData, editorState);

let goBack = EditorStateSystemEdit.goBack;

let goForward = EditorStateSystemEdit.goForward;

let storeEditorState = EditorStateSystemEdit.storeEditorState;