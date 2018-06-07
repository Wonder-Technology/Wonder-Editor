open EditorType;

let getCurrentDragSource = editorState => editorState.currentDragSource;
let unsafeGetCurrentDragSource = editorState => editorState.currentDragSource;

let setCurrentDragSource = ((flag, id), editorState) => {
  ...editorState,
  currentDragSource: (Some(flag), Some(id)),
};

let clearCurrentDragSource = editorState => {
  ...editorState,
  currentDragSource: (None, None),
};