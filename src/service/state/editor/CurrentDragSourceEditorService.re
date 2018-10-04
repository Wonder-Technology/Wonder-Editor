open EditorType;

let getCurrentDragSource = editorState => editorState.currentDragSource;
let unsafeGetCurrentDragSource = editorState => editorState.currentDragSource;

let setCurrentDragSource = ((widget, id), editorState) => {
  ...editorState,
  currentDragSource: (Some(widget), Some(id)),
};

let clearCurrentDragSource = editorState => {
  ...editorState,
  currentDragSource: (None, None),
};