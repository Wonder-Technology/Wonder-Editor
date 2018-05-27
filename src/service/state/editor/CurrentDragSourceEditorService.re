open EditorType;

let getCurrentDragSource = (editorState) => editorState.currentDragSource;

let setCurrentDragSource = ((sign, id), editorState) => {
  ...editorState,
  currentDragSource: (sign, Some(id))
};

let clearCurrentDragSource = (editorState) => {...editorState, currentDragSource: ("", None)};