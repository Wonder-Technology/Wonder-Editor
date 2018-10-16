

import * as IndexAssetService$WonderEditor from "../../../record/editor/asset/IndexAssetService.js";

function getIndex(editorState) {
  return IndexAssetService$WonderEditor.getIndex(editorState[/* assetRecord */1]);
}

function increaseIndex(editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */IndexAssetService$WonderEditor.increaseIndex(editorState[/* assetRecord */1]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */2],
          /* gameViewRecord */editorState[/* gameViewRecord */3],
          /* eventRecord */editorState[/* eventRecord */4],
          /* imguiRecord */editorState[/* imguiRecord */5],
          /* inspectorRecord */editorState[/* inspectorRecord */6],
          /* currentDragSource */editorState[/* currentDragSource */7],
          /* currentSelectSource */editorState[/* currentSelectSource */8],
          /* loopId */editorState[/* loopId */9]
        ];
}

export {
  getIndex ,
  increaseIndex ,
  
}
/* No side effect */
