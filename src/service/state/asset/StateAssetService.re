open EditorStateDataType;

let getState = () =>
  CreateEditorStateDataEditorService.editorStateData.assetState;

let setState = state => {
  CreateEditorStateDataEditorService.editorStateData.assetState = state;
  state;
};