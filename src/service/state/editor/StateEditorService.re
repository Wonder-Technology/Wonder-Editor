open EditorStateDataType;

let getStateIsDebug = () =>
  CreateEditorStateDataEditorService.editorStateData.isDebug;

let getState = () =>
  CreateEditorStateDataEditorService.editorStateData.editorState;

let setState = state => {
  CreateEditorStateDataEditorService.editorStateData.editorState = state;
  state;
};