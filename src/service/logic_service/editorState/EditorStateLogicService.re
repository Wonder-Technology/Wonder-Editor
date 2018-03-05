let getState = () => EditorStateCommonService.getState(EditorStateDataEdit.stateData);

let setState = (editorState) =>
  EditorStateCommonService.setState(EditorStateDataEdit.stateData, editorState);

let undo = EditorStateCommonService.undo;

let redo = EditorStateCommonService.redo;

let storeEditorState = EditorStateCommonService.storeEditorState;
