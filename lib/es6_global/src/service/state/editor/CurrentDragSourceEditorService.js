


function getCurrentDragSource(editorState) {
  return editorState[/* currentDragSource */2];
}

function unsafeGetCurrentDragSource(editorState) {
  return editorState[/* currentDragSource */2];
}

function setCurrentDragSource(param, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentDragSource : tuple */[
            /* Some */[param[0]],
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
            /* None */0,
            /* None */0
          ],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

export {
  getCurrentDragSource ,
  unsafeGetCurrentDragSource ,
  setCurrentDragSource ,
  clearCurrentDragSource ,
  
}
/* No side effect */
