

import * as IndexAssetService$WonderEditor from "../../../record/editor/asset/IndexAssetService.js";

function getIndex(editorState) {
  return IndexAssetService$WonderEditor.getIndex(editorState[/* assetRecord */1]);
}

function increaseIndex(editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */IndexAssetService$WonderEditor.increaseIndex(editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

export {
  getIndex ,
  increaseIndex ,
  
}
/* No side effect */
