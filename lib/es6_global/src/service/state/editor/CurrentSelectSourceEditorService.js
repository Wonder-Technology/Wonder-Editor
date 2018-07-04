


function getCurrentSelectSource(editorState) {
  return editorState[/* currentSelectSource */2];
}

function setCurrentSelectSource(currentSelectSource, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* currentDragSource */editorState[/* currentDragSource */1],
          /* currentSelectSource : Some */[currentSelectSource],
          /* loopId */editorState[/* loopId */3]
        ];
}

export {
  getCurrentSelectSource ,
  setCurrentSelectSource ,
  
}
/* No side effect */
