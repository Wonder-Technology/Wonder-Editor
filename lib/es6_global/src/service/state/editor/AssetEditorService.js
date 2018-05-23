'use strict';

import * as IndexAssetService$WonderEditor                          from "../../record/asset/IndexAssetService.js";
import * as NodeMapAssetService$WonderEditor                        from "../../record/asset/NodeMapAssetService.js";
import * as AssetTreeAssetService$WonderEditor                      from "../../record/asset/AssetTreeAssetService.js";
import * as CurrentAssetTreeNodeAssetService$WonderEditor           from "../../record/asset/CurrentAssetTreeNodeAssetService.js";
import * as CurrentAssetChildrenNodeParentAssetService$WonderEditor from "../../record/asset/CurrentAssetChildrenNodeParentAssetService.js";

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

function getCurrentAssetChildrenNodeParent(editorState) {
  return CurrentAssetChildrenNodeParentAssetService$WonderEditor.getCurrentAssetChildrenNodeParent(editorState[/* assetRecord */0]);
}

function unsafeGetCurrentAssetChildrenNodeParent(editorState) {
  return CurrentAssetChildrenNodeParentAssetService$WonderEditor.unsafeGetCurrentAssetChildrenNodeParent(editorState[/* assetRecord */0]);
}

function clearCurrentAssetChildrenNodeParent(editorState) {
  return /* record */[
          /* assetRecord */CurrentAssetChildrenNodeParentAssetService$WonderEditor.clearCurrentAssetChildrenNodeParent(editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function setCurrentAssetChildrenNodeParent(currentAssetChildrenNodeParent, editorState) {
  return /* record */[
          /* assetRecord */CurrentAssetChildrenNodeParentAssetService$WonderEditor.setCurrentAssetChildrenNodeParent(currentAssetChildrenNodeParent, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function getIndex(editorState) {
  return IndexAssetService$WonderEditor.getIndex(editorState[/* assetRecord */0]);
}

function setIndex(index, editorState) {
  return /* record */[
          /* assetRecord */IndexAssetService$WonderEditor.setIndex(index, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function unsafeGetNodeMap(editorState) {
  return NodeMapAssetService$WonderEditor.unsafeGetNodeMap(editorState[/* assetRecord */0]);
}

function setNodeMap(nodeMap, editorState) {
  return /* record */[
          /* assetRecord */NodeMapAssetService$WonderEditor.setNodeMap(nodeMap, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function getAssetTree(editorState) {
  return AssetTreeAssetService$WonderEditor.getAssetTree(editorState[/* assetRecord */0]);
}

function unsafeGetAssetTree(editorState) {
  return AssetTreeAssetService$WonderEditor.unsafeGetAssetTree(editorState[/* assetRecord */0]);
}

function clearAssetTree(editorState) {
  return /* record */[
          /* assetRecord */AssetTreeAssetService$WonderEditor.clearAssetTree(editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function setAsseTree(assetTree, editorState) {
  return /* record */[
          /* assetRecord */AssetTreeAssetService$WonderEditor.setAssetTree(assetTree, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
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
  getIndex                                ,
  setIndex                                ,
  unsafeGetNodeMap                        ,
  setNodeMap                              ,
  getAssetTree                            ,
  unsafeGetAssetTree                      ,
  clearAssetTree                          ,
  setAsseTree                             ,
  
}
/* AssetTreeAssetService-WonderEditor Not a pure module */
