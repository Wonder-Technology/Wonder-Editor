'use strict';


function getLoopId(editorState) {
  return editorState[/* loopId */3];
}

function setLoopId(id, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentTree */editorState[/* currentTree */2],
          /* loopId */id
        ];
}

export {
  getLoopId ,
  setLoopId ,
  
}
/* No side effect */
