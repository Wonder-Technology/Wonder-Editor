open EditorStateDataType;

let getStateIsDebug = () => CreateEditorStateDataEditorService.editorStateData.isDebug;

let getState = () => CreateEditorStateDataEditorService.editorStateData.state;

let setState = (state) => {
  CreateEditorStateDataEditorService.editorStateData.state = state;
  state
};