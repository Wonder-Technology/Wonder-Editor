

import * as CurrentNodeParentIdAssetService$WonderEditor from "../../../record/editor/asset/CurrentNodeParentIdAssetService.js";

function getCurrentNodeParentId(editorState) {
  return CurrentNodeParentIdAssetService$WonderEditor.getCurrentNodeParentId(editorState[/* assetRecord */0]);
}

function unsafeGetCurrentNodeParentId(editorState) {
  return CurrentNodeParentIdAssetService$WonderEditor.unsafeGetCurrentNodeParentId(editorState[/* assetRecord */0]);
}

function clearCurrentNodeParentId(editorState) {
  return /* record */[
          /* assetRecord */CurrentNodeParentIdAssetService$WonderEditor.clearCurrentNodeParentId(editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function setCurrentNodeParentId(currentNodeParentId, editorState) {
  return /* record */[
          /* assetRecord */CurrentNodeParentIdAssetService$WonderEditor.setCurrentNodeParentId(currentNodeParentId, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

export {
  getCurrentNodeParentId ,
  unsafeGetCurrentNodeParentId ,
  clearCurrentNodeParentId ,
  setCurrentNodeParentId ,
  
}
/* CurrentNodeParentIdAssetService-WonderEditor Not a pure module */
