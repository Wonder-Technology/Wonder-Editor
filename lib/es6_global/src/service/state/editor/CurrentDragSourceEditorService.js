


function getCurrentDragSource(editorState) {
  return editorState[/* currentDragSource */3];
}

function unsafeGetCurrentDragSource(editorState) {
  return editorState[/* currentDragSource */3];
}

function setCurrentDragSource(param, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource : tuple */[
            param[0],
            param[1]
          ],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

function clearCurrentDragSource(editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource : tuple */[
            undefined,
            undefined
          ],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

export {
  getCurrentDragSource ,
  unsafeGetCurrentDragSource ,
  setCurrentDragSource ,
  clearCurrentDragSource ,
  
}
/* No side effect */
