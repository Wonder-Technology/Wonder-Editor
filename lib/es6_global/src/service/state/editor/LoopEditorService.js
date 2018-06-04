


function getLoopId(editorState) {
  return editorState[/* loopId */4];
}

function setLoopId(id, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */id
        ];
}

export {
  getLoopId ,
  setLoopId ,
  
}
/* No side effect */
