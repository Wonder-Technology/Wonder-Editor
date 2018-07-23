


function getCurrentDragSource(editorState) {
  return editorState[/* currentDragSource */2];
}

function unsafeGetCurrentDragSource(editorState) {
  return editorState[/* currentDragSource */2];
}

function setCurrentDragSource(param, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* currentDragSource : tuple */[
            param[0],
            param[1]
          ],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function clearCurrentDragSource(editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* currentDragSource : tuple */[
            undefined,
            undefined
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
