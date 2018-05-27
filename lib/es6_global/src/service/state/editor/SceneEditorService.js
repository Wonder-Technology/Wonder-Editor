'use strict';

import * as RootSceneService$WonderEditor                 from "../../record/editor/scene/RootSceneService.js";
import * as IsRunSceneService$WonderEditor                from "../../record/editor/scene/isRunSceneService.js";
import * as DiffMapSceneService$WonderEditor              from "../../record/editor/scene/DiffMapSceneService.js";
import * as CurrentSceneTreeNodeSceneService$WonderEditor from "../../record/editor/scene/CurrentSceneTreeNodeSceneService.js";

function getIsRun(editorState) {
  return IsRunSceneService$WonderEditor.getIsRun(editorState[/* sceneRecord */1]);
}

function setIsRun(isRun, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */IsRunSceneService$WonderEditor.setIsRun(isRun, editorState[/* sceneRecord */1]),
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function unsafeGetScene(editorState) {
  return RootSceneService$WonderEditor.unsafeGetScene(editorState[/* sceneRecord */1]);
}

function setScene(scene, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */RootSceneService$WonderEditor.setScene(scene, editorState[/* sceneRecord */1]),
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function unsafeGetDiffMap(editorState) {
  return DiffMapSceneService$WonderEditor.unsafeGetDiffMap(editorState[/* sceneRecord */1]);
}

function setDiffMap(diffMap, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */DiffMapSceneService$WonderEditor.setDiffMap(diffMap, editorState[/* sceneRecord */1]),
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function unsafeGetCurrentSceneTreeNode(editorState) {
  return CurrentSceneTreeNodeSceneService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState[/* sceneRecord */1]);
}

function getCurrentSceneTreeNode(editorState) {
  return CurrentSceneTreeNodeSceneService$WonderEditor.getCurrentSceneTreeNode(editorState[/* sceneRecord */1]);
}

function setCurrentSceneTreeNode(gameObject, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */CurrentSceneTreeNodeSceneService$WonderEditor.setCurrentSceneTreeNode(gameObject, editorState[/* sceneRecord */1]),
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function clearCurrentSceneTreeNode(editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */CurrentSceneTreeNodeSceneService$WonderEditor.clearCurrentSceneTreeNode(editorState[/* sceneRecord */1]),
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

export {
  getIsRun                      ,
  setIsRun                      ,
  unsafeGetScene                ,
  setScene                      ,
  unsafeGetDiffMap              ,
  setDiffMap                    ,
  unsafeGetCurrentSceneTreeNode ,
  getCurrentSceneTreeNode       ,
  setCurrentSceneTreeNode       ,
  clearCurrentSceneTreeNode     ,
  
}
/* RootSceneService-WonderEditor Not a pure module */
