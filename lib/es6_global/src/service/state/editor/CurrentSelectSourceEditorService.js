


function getCurrentSelectSource(editorState) {
  return editorState[/* currentSelectSource */4];
}

function setCurrentSelectSource(currentSelectSource, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */currentSelectSource,
          /* loopId */editorState[/* loopId */5]
        ];
}

export {
  getCurrentSelectSource ,
  setCurrentSelectSource ,
  
}
/* No side effect */
