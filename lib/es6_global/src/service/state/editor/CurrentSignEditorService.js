'use strict';


function getCurrentSign(editorState) {
  return editorState[/* currentSign */2];
}

function setCurrentSign(currentSign, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */currentSign,
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function clearCurrentSign(editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */"",
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

export {
  getCurrentSign   ,
  setCurrentSign   ,
  clearCurrentSign ,
  
}
/* No side effect */
