

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

function setCurrentNodeParentId(currentNodeParentId, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */CurrentNodeParentIdAssetService$WonderEditor.setCurrentNodeParentId(currentNodeParentId, editorState[/* assetRecord */1]),
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
  getCurrentNodeParentId ,
  unsafeGetCurrentNodeParentId ,
  clearCurrentNodeParentId ,
  setCurrentNodeParentId ,
  
}
/* CurrentNodeParentIdAssetService-WonderEditor Not a pure module */
