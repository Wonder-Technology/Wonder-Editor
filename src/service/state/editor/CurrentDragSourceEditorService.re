open EditorType;

let getCurrentDragSource = (editorState) => editorState.currentDragSource;

let setCurrentDragSource = ((flag, id), editorState) => {
  ...editorState,
  currentDragSource: (flag, Some(id))
};

let clearCurrentDragSource = (editorState) => {...editorState, currentDragSource: ("", None)};