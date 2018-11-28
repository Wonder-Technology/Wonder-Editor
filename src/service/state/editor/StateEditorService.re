open EditorStateDataType;

let getStateIsDebug = () =>
  CreateEditorStateDataEditorService.editorStateData.isDebug;

let setStateIsDebug = isDebug => {
  CreateEditorStateDataEditorService.editorStateData.isDebug = isDebug;

  ();
};

let getIsRun = () => CreateEditorStateDataEditorService.editorStateData.isRun;

let setIsRun = isRun => {
  CreateEditorStateDataEditorService.editorStateData.isRun = isRun;

  ();
};

let getState = () =>
  CreateEditorStateDataEditorService.editorStateData.editorState;

let setState = state => {
  CreateEditorStateDataEditorService.editorStateData.editorState = state;
  state;
};