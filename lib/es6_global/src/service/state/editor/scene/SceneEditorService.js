

import * as IsRunSceneService$WonderEditor from "../../../record/editor/scene/isRunSceneService.js";
import * as CurrentSceneTreeNodeSceneService$WonderEditor from "../../../record/editor/scene/CurrentSceneTreeNodeSceneService.js";

function getIsRun(editorState) {
  return IsRunSceneService$WonderEditor.getIsRun(editorState[/* sceneRecord */0]);
}

function setIsRun(isRun, editorState) {
  return /* record */[
          /* sceneRecord */IsRunSceneService$WonderEditor.setIsRun(isRun, editorState[/* sceneRecord */0]),
          /* assetRecord */editorState[/* assetRecord */1],
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

function unsafeGetCurrentSceneTreeNode(editorState) {
  return CurrentSceneTreeNodeSceneService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState[/* sceneRecord */0]);
}

function getCurrentSceneTreeNode(editorState) {
  return CurrentSceneTreeNodeSceneService$WonderEditor.getCurrentSceneTreeNode(editorState[/* sceneRecord */0]);
}

function setCurrentSceneTreeNode(gameObject, editorState) {
  return /* record */[
          /* sceneRecord */CurrentSceneTreeNodeSceneService$WonderEditor.setCurrentSceneTreeNode(gameObject, editorState[/* sceneRecord */0]),
          /* assetRecord */editorState[/* assetRecord */1],
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

function clearCurrentSceneTreeNode(editorState) {
  return /* record */[
          /* sceneRecord */CurrentSceneTreeNodeSceneService$WonderEditor.clearCurrentSceneTreeNode(editorState[/* sceneRecord */0]),
          /* assetRecord */editorState[/* assetRecord */1],
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
  getIsRun ,
  setIsRun ,
  unsafeGetCurrentSceneTreeNode ,
  getCurrentSceneTreeNode ,
  setCurrentSceneTreeNode ,
  clearCurrentSceneTreeNode ,
  
}
/* CurrentSceneTreeNodeSceneService-WonderEditor Not a pure module */
