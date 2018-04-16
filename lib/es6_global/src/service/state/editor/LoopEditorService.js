'use strict';


function getLoopId(editorState) {
  return editorState[/* loopId */1];
}

function setLoopId(id, editorState) {
  editorState[/* loopId */1] = id;
  return editorState;
}

export {
  getLoopId ,
  setLoopId ,
  
}
/* No side effect */
