

import * as CurrentNodeDataAssetService$WonderEditor from "../../../record/editor/asset/CurrentNodeDataAssetService.js";

function getCurrentNodeData(editorState) {
  return CurrentNodeDataAssetService$WonderEditor.getCurrentNodeData(editorState[/* assetRecord */1]);
}

function unsafeGetCurrentNodeData(editorState) {
  return CurrentNodeDataAssetService$WonderEditor.unsafeGetCurrentNodeData(editorState[/* assetRecord */1]);
}

function clearCurrentNodeData(editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */CurrentNodeDataAssetService$WonderEditor.clearCurrentNodeData(editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

function setCurrentNodeData(currentNodeData, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */CurrentNodeDataAssetService$WonderEditor.setCurrentNodeData(currentNodeData, editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

export {
  getCurrentNodeData ,
  unsafeGetCurrentNodeData ,
  clearCurrentNodeData ,
  setCurrentNodeData ,
  
}
/* CurrentNodeDataAssetService-WonderEditor Not a pure module */
