'use strict';


function getCurrentDragSource(editorState) {
  return editorState[/* currentDragSource */2];
}

function setCurrentDragSource(param, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentDragSource : tuple */[
            param[0],
            /* Some */[param[1]]
          ],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function clearCurrentDragSource(editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentDragSource : tuple */[
            "",
            /* None */0
          ],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

export {
  getCurrentDragSource   ,
  setCurrentDragSource   ,
  clearCurrentDragSource ,
  
}
/* No side effect */
