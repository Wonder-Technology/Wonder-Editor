'use strict';


function getLoopId(editorState) {
  return editorState[/* loopId */4];
}

function setLoopId(id, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */id
        ];
}

export {
  getLoopId ,
  setLoopId ,
  
}
/* No side effect */
