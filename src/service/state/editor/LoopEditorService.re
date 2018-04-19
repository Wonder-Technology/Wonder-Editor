open EditorType;

let getLoopId = (editorState) => editorState.loopId;

let setLoopId = (id, editorState) => {...editorState, loopId: id};