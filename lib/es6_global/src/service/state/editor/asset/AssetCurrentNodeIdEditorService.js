

import * as CurrentNodeIdAssetService$WonderEditor from "../../../record/editor/asset/CurrentNodeIdAssetService.js";

function getCurrentNodeId(editorState) {
  return CurrentNodeIdAssetService$WonderEditor.getCurrentNodeId(editorState[/* assetRecord */0]);
}

function unsafeGetCurrentNodeId(editorState) {
  return CurrentNodeIdAssetService$WonderEditor.unsafeGetCurrentNodeId(editorState[/* assetRecord */0]);
}

function clearCurrentNodeId(editorState) {
  return /* record */[
          /* assetRecord */CurrentNodeIdAssetService$WonderEditor.clearCurrentNodeId(editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function setCurrentNodeId(currentNodeId, editorState) {
  return /* record */[
          /* assetRecord */CurrentNodeIdAssetService$WonderEditor.setCurrentNodeId(currentNodeId, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

export {
  getCurrentNodeId ,
  unsafeGetCurrentNodeId ,
  clearCurrentNodeId ,
  setCurrentNodeId ,
  
}
/* CurrentNodeIdAssetService-WonderEditor Not a pure module */
