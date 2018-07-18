


function getCurrentDragSource(editorState) {
  return editorState[/* currentDragSource */1];
}

function unsafeGetCurrentDragSource(editorState) {
  return editorState[/* currentDragSource */1];
}

function setCurrentDragSource(param, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* currentDragSource : tuple */[
            /* Some */[param[0]],
            /* Some */[param[1]]
          ],
          /* currentSelectSource */editorState[/* currentSelectSource */2],
          /* loopId */editorState[/* loopId */3]
        ];
}

function clearCurrentDragSource(editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* currentDragSource : tuple */[
            /* None */0,
            /* None */0
          ],
          /* currentSelectSource */editorState[/* currentSelectSource */2],
          /* loopId */editorState[/* loopId */3]
        ];
}

export {
  getCurrentDragSource ,
  unsafeGetCurrentDragSource ,
  setCurrentDragSource ,
  clearCurrentDragSource ,
  
}
/* No side effect */
