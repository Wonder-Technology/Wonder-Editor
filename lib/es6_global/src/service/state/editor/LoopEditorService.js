'use strict';


function getLoopId(editorState) {
  return editorState[/* loopId */1];
}

function setLoopId(id, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* loopId */id
        ];
}

export {
  getLoopId ,
  setLoopId ,
  
}
/* No side effect */
