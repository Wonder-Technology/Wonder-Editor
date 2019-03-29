open EditorStateDataType;

let getStateIsDebug = () =>
  StateDataEditor.editorStateData.isDebug;

let setStateIsDebug = isDebug => {
  StateDataEditor.editorStateData.isDebug = isDebug;

  ();
};

let getIsRun = () => StateDataEditor.editorStateData.isRun;

let setIsRun = isRun => {
  StateDataEditor.editorStateData.isRun = isRun;

  ();
};

let getState = () =>
  StateDataEditor.editorStateData.editorState;

let setState = state => {
  StateDataEditor.editorStateData.editorState = state;
  state;
};