

import * as CurrentNodeParentIdAssetService$WonderEditor from "../../../record/editor/asset/CurrentNodeParentIdAssetService.js";

function getCurrentNodeParentId(editorState) {
  return CurrentNodeParentIdAssetService$WonderEditor.getCurrentNodeParentId(editorState[/* assetRecord */1]);
}

function unsafeGetCurrentNodeParentId(editorState) {
  return CurrentNodeParentIdAssetService$WonderEditor.unsafeGetCurrentNodeParentId(editorState[/* assetRecord */1]);
}

function clearCurrentNodeParentId(editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */CurrentNodeParentIdAssetService$WonderEditor.clearCurrentNodeParentId(editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

function setCurrentNodeParentId(currentNodeParentId, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */CurrentNodeParentIdAssetService$WonderEditor.setCurrentNodeParentId(currentNodeParentId, editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

export {
  getCurrentNodeParentId ,
  unsafeGetCurrentNodeParentId ,
  clearCurrentNodeParentId ,
  setCurrentNodeParentId ,
  
}
/* CurrentNodeParentIdAssetService-WonderEditor Not a pure module */
