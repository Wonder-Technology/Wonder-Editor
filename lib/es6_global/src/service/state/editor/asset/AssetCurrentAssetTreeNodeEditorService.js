'use strict';

import * as CurrentAssetTreeNodeAssetService$WonderEditor from "../../../record/editor/asset/CurrentAssetTreeNodeAssetService.js";

function getCurrentAssetTreeNode(editorState) {
  return CurrentAssetTreeNodeAssetService$WonderEditor.getCurrentAssetTreeNode(editorState[/* assetRecord */0]);
}

function unsafeGetCurrentAssetTreeNode(editorState) {
  return CurrentAssetTreeNodeAssetService$WonderEditor.unsafeGetCurrentAssetTreeNode(editorState[/* assetRecord */0]);
}

function clearCurrentAssetTreeNode(editorState) {
  return /* record */[
          /* assetRecord */CurrentAssetTreeNodeAssetService$WonderEditor.clearCurrentAssetTreeNode(editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function setCurrentAssetTreeNode(currentAssetTreeNode, editorState) {
  return /* record */[
          /* assetRecord */CurrentAssetTreeNodeAssetService$WonderEditor.setCurrentAssetTreeNode(currentAssetTreeNode, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

export {
  getCurrentAssetTreeNode       ,
  unsafeGetCurrentAssetTreeNode ,
  clearCurrentAssetTreeNode     ,
  setCurrentAssetTreeNode       ,
  
}
/* CurrentAssetTreeNodeAssetService-WonderEditor Not a pure module */
