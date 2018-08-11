open EditorType;

let getCurrentDragSource = editorState => editorState.currentDragSource;
let unsafeGetCurrentDragSource = editorState => editorState.currentDragSource;

let setCurrentDragSource = ((widge, id), editorState) => {
  ...editorState,
  currentDragSource: (Some(widge), Some(id)),
};

let clearCurrentDragSource = editorState => {
  ...editorState,
  currentDragSource: (None, None),
};