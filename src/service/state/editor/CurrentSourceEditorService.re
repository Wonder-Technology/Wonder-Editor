open EditorType;

let getCurrentSource = (editorState) => editorState.currentSource;

let setCurrentSource = (currentSource, editorState) => {
  ...editorState,
  currentSource: Some(currentSource)
};