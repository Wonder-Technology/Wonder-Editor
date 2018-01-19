let getEditorState = () => EditorStateSystemEdit.getState(EditorStateDataEdit.stateData);

let setEditorState = (editorState) =>
  EditorStateSystemEdit.setState(EditorStateDataEdit.stateData, editorState);

let goBack = EditorStateBuss.goBack;

let goForward = EditorStateBuss.goForward;

let storeEditorState = EditorStateBuss.storeEditorState;