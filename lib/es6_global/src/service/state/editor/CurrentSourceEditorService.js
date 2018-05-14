'use strict';


function getCurrentSource(editorState) {
  return editorState[/* currentSource */3];
}

function setCurrentSource(currentSource, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource : Some */[currentSource],
          /* loopId */editorState[/* loopId */4]
        ];
}

export {
  getCurrentSource ,
  setCurrentSource ,
  
}
/* No side effect */
