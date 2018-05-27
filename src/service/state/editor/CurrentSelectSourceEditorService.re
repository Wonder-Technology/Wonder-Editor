open EditorType;

let getCurrentSelectSource = (editorState) => editorState.currentSelectSource;

let setCurrentSelectSource = (currentSelectSource, editorState) => {
  ...editorState,
  currentSelectSource: Some(currentSelectSource)
};