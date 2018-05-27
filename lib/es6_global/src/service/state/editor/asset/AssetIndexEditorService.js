'use strict';

import * as IndexAssetService$WonderEditor from "../../../record/editor/asset/IndexAssetService.js";

function increaseIndex(state) {
  return /* record */[
          /* assetRecord */IndexAssetService$WonderEditor.increaseIndex(state[/* assetRecord */0]),
          /* sceneRecord */state[/* sceneRecord */1],
          /* currentDragSource */state[/* currentDragSource */2],
          /* currentSelectSource */state[/* currentSelectSource */3],
          /* loopId */state[/* loopId */4]
        ];
}

function getIndex(editorState) {
  return IndexAssetService$WonderEditor.getIndex(editorState[/* assetRecord */0]);
}

export {
  increaseIndex ,
  getIndex      ,
  
}
/* No side effect */
