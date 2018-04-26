'use strict';


function getCurrenttree(editorState) {
  return editorState[/* currentTree */2];
}

function setCurrentTree(currentTree, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentTree */currentTree,
          /* loopId */editorState[/* loopId */3]
        ];
}

function clearCurrentTree(editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentTree */"",
          /* loopId */editorState[/* loopId */3]
        ];
}

export {
  getCurrenttree   ,
  setCurrentTree   ,
  clearCurrentTree ,
  
}
/* No side effect */
