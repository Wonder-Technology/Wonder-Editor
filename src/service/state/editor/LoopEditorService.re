open EditorType;

let getLoopId = (editorState) => editorState.loopId;

/* TODO why only use mutable */
let setLoopId = (id, editorState) => {
  editorState.loopId = id;
  editorState
};