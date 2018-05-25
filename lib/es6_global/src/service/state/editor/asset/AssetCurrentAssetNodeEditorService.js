'use strict';

import * as CurrentAssetTreeNodeAssetService$WonderEditor           from "../../../record/editor/asset/CurrentAssetTreeNodeAssetService.js";
import * as CurrentAssetChildrenNodeParentAssetService$WonderEditor from "../../../record/editor/asset/CurrentAssetChildrenNodeParentAssetService.js";

function getCurrentAssetTreeNode(editorState) {
  return CurrentAssetTreeNodeAssetService$WonderEditor.getCurrentAssetTreeNode(editorState[/* assetRecord */0]);
}

function unsafeGetCurrentAssetTreeNode(editorState) {
  return CurrentAssetTreeNodeAssetService$WonderEditor.unsafeGetCurrentAssetTreeNode(editorState[/* assetRecord */0]);
}

function clearCurrentAssetTreeNode(editorState) {
  return CurrentAssetTreeNodeAssetService$WonderEditor.clearCurrentAssetTreeNode(editorState[/* assetRecord */0]);
}

function setCurrentAssetTreeNode(currentAssetTreeNode, editorState) {
  return CurrentAssetTreeNodeAssetService$WonderEditor.setCurrentAssetTreeNode(currentAssetTreeNode, editorState[/* assetRecord */0]);
}

function getCurrentAssetChildrenNodeParent(editorState) {
  return CurrentAssetChildrenNodeParentAssetService$WonderEditor.getCurrentAssetChildrenNodeParent(editorState[/* assetRecord */0]);
}

function unsafeGetCurrentAssetChildrenNodeParent(editorState) {
  return CurrentAssetChildrenNodeParentAssetService$WonderEditor.unsafeGetCurrentAssetChildrenNodeParent(editorState[/* assetRecord */0]);
}

function clearCurrentAssetChildrenNodeParent(editorState) {
  return CurrentAssetChildrenNodeParentAssetService$WonderEditor.clearCurrentAssetChildrenNodeParent(editorState[/* assetRecord */0]);
}

function setCurrentAssetChildrenNodeParent(currentAssetChildrenNodeParent, editorState) {
  return CurrentAssetChildrenNodeParentAssetService$WonderEditor.setCurrentAssetChildrenNodeParent(currentAssetChildrenNodeParent, editorState[/* assetRecord */0]);
}

export {
  getCurrentAssetTreeNode                 ,
  unsafeGetCurrentAssetTreeNode           ,
  clearCurrentAssetTreeNode               ,
  setCurrentAssetTreeNode                 ,
  getCurrentAssetChildrenNodeParent       ,
  unsafeGetCurrentAssetChildrenNodeParent ,
  clearCurrentAssetChildrenNodeParent     ,
  setCurrentAssetChildrenNodeParent       ,
  
}
/* CurrentAssetTreeNodeAssetService-WonderEditor Not a pure module */
