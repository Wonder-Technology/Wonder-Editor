

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

function setCurrentNodeData(currentNodeData, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */CurrentNodeDataAssetService$WonderEditor.setCurrentNodeData(currentNodeData, editorState[/* assetRecord */1]),
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
  getCurrentNodeData ,
  unsafeGetCurrentNodeData ,
  clearCurrentNodeData ,
  setCurrentNodeData ,
  
}
/* CurrentNodeDataAssetService-WonderEditor Not a pure module */
