'use strict';


function getCurrentSign(editorState) {
  return editorState[/* currentSign */2];
}

function setCurrentSign(currentSign, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */currentSign,
          /* loopId */editorState[/* loopId */3]
        ];
}

function clearCurrentSign(editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */"",
          /* loopId */editorState[/* loopId */3]
        ];
}

export {
  getCurrentSign   ,
  setCurrentSign   ,
  clearCurrentSign ,
  
}
/* No side effect */
