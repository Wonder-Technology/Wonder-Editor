open EditorStateDataType;

let getStateIsDebug = () => EditorStateData.editorStateData.isDebug;

let getState = () => EditorStateData.editorStateData.state;

let setState = (state) => {
  EditorStateData.editorStateData.state = state;
  state
};
/* TODO move to tuple: EditorHistoryService.re */