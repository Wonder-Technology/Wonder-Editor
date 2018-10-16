


function getCurrentSelectSource(editorState) {
  return editorState[/* currentSelectSource */8];
}

function setCurrentSelectSource(currentSelectSource, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */editorState[/* assetRecord */1],
          /* sceneViewRecord */editorState[/* sceneViewRecord */2],
          /* gameViewRecord */editorState[/* gameViewRecord */3],
          /* eventRecord */editorState[/* eventRecord */4],
          /* imguiRecord */editorState[/* imguiRecord */5],
          /* inspectorRecord */editorState[/* inspectorRecord */6],
          /* currentDragSource */editorState[/* currentDragSource */7],
          /* currentSelectSource */currentSelectSource,
          /* loopId */editorState[/* loopId */9]
        ];
}

export {
  getCurrentSelectSource ,
  setCurrentSelectSource ,
  
}
/* No side effect */
