


function getCurrentSelectSource(editorState) {
  return editorState[/* currentSelectSource */3];
}

function setCurrentSelectSource(currentSelectSource, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource */currentSelectSource,
          /* loopId */editorState[/* loopId */4]
        ];
}

export {
  getCurrentSelectSource ,
  setCurrentSelectSource ,
  
}
/* No side effect */
