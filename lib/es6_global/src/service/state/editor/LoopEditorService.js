


function getLoopId(editorState) {
  return editorState[/* loopId */3];
}

function setLoopId(id, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* currentDragSource */editorState[/* currentDragSource */1],
          /* currentSelectSource */editorState[/* currentSelectSource */2],
          /* loopId */id
        ];
}

export {
  getLoopId ,
  setLoopId ,
  
}
/* No side effect */
