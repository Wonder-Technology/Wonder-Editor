

import * as RootSceneService$WonderEditor from "../../record/editor/scene/RootSceneService.js";
import * as IsRunSceneService$WonderEditor from "../../record/editor/scene/isRunSceneService.js";
import * as DiffMapSceneService$WonderEditor from "../../record/editor/scene/DiffMapSceneService.js";
import * as CurrentSceneTreeNodeSceneService$WonderEditor from "../../record/editor/scene/CurrentSceneTreeNodeSceneService.js";

function getIsRun(editorState) {
  return IsRunSceneService$WonderEditor.getIsRun(editorState[/* sceneRecord */0]);
}

function setIsRun(isRun, editorState) {
  return /* record */[
          /* sceneRecord */IsRunSceneService$WonderEditor.setIsRun(isRun, editorState[/* sceneRecord */0]),
          /* currentDragSource */editorState[/* currentDragSource */1],
          /* currentSelectSource */editorState[/* currentSelectSource */2],
          /* loopId */editorState[/* loopId */3]
        ];
}

function unsafeGetScene(editorState) {
  return RootSceneService$WonderEditor.unsafeGetScene(editorState[/* sceneRecord */0]);
}

function setScene(scene, editorState) {
  return /* record */[
          /* sceneRecord */RootSceneService$WonderEditor.setScene(scene, editorState[/* sceneRecord */0]),
          /* currentDragSource */editorState[/* currentDragSource */1],
          /* currentSelectSource */editorState[/* currentSelectSource */2],
          /* loopId */editorState[/* loopId */3]
        ];
}

function unsafeGetDiffMap(editorState) {
  return DiffMapSceneService$WonderEditor.unsafeGetDiffMap(editorState[/* sceneRecord */0]);
}

function setDiffMap(diffMap, editorState) {
  return /* record */[
          /* sceneRecord */DiffMapSceneService$WonderEditor.setDiffMap(diffMap, editorState[/* sceneRecord */0]),
          /* currentDragSource */editorState[/* currentDragSource */1],
          /* currentSelectSource */editorState[/* currentSelectSource */2],
          /* loopId */editorState[/* loopId */3]
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
          /* currentDragSource */editorState[/* currentDragSource */1],
          /* currentSelectSource */editorState[/* currentSelectSource */2],
          /* loopId */editorState[/* loopId */3]
        ];
}

function clearCurrentSceneTreeNode(editorState) {
  return /* record */[
          /* sceneRecord */CurrentSceneTreeNodeSceneService$WonderEditor.clearCurrentSceneTreeNode(editorState[/* sceneRecord */0]),
          /* currentDragSource */editorState[/* currentDragSource */1],
          /* currentSelectSource */editorState[/* currentSelectSource */2],
          /* loopId */editorState[/* loopId */3]
        ];
}

export {
  getIsRun ,
  setIsRun ,
  unsafeGetScene ,
  setScene ,
  unsafeGetDiffMap ,
  setDiffMap ,
  unsafeGetCurrentSceneTreeNode ,
  getCurrentSceneTreeNode ,
  setCurrentSceneTreeNode ,
  clearCurrentSceneTreeNode ,
  
}
/* RootSceneService-WonderEditor Not a pure module */
