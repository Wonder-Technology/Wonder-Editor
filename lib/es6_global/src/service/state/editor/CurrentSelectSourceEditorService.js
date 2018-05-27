'use strict';


function getCurrentSelectSource(editorState) {
  return editorState[/* currentSelectSource */3];
}

function setCurrentSelectSource(currentSelectSource, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource : Some */[currentSelectSource],
          /* loopId */editorState[/* loopId */4]
        ];
}

export {
  getCurrentSelectSource ,
  setCurrentSelectSource ,
  
}
/* No side effect */
