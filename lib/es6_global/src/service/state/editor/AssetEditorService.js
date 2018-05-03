'use strict';

import * as IndexAssetService$WonderEditor           from "../../record/asset/IndexAssetService.js";
import * as FileMapAssetService$WonderEditor         from "../../record/asset/FileMapAssetService.js";
import * as AssetTreeAssetService$WonderEditor       from "../../record/asset/AssetTreeAssetService.js";
import * as CurrentTreeNodeAssetService$WonderEditor from "../../record/asset/CurrentTreeNodeAssetService.js";

function getCurrentTreeNode(editorState) {
  return CurrentTreeNodeAssetService$WonderEditor.getCurrentTreeNode(editorState[/* assetRecord */0]);
}

function unsafeGetCurrentTreeNode(editorState) {
  return CurrentTreeNodeAssetService$WonderEditor.unsafeGetCurrentTreeNode(editorState[/* assetRecord */0]);
}

function clearCurrentTreeNode(editorState) {
  return /* record */[
          /* assetRecord */CurrentTreeNodeAssetService$WonderEditor.clearCurrentTreeNode(editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* loopId */editorState[/* loopId */3]
        ];
}

function setCurrentTreeNode(currentTreeNode, editorState) {
  return /* record */[
          /* assetRecord */CurrentTreeNodeAssetService$WonderEditor.setCurrentTreeNode(currentTreeNode, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* loopId */editorState[/* loopId */3]
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
          /* loopId */editorState[/* loopId */3]
        ];
}

function getFileMap(editorState) {
  return FileMapAssetService$WonderEditor.getFileMap(editorState[/* assetRecord */0]);
}

function setFileMap(imageMap, editorState) {
  return /* record */[
          /* assetRecord */FileMapAssetService$WonderEditor.setFileMap(imageMap, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* loopId */editorState[/* loopId */3]
        ];
}

function getAssetTree(editorState) {
  return AssetTreeAssetService$WonderEditor.getAssetTree(editorState[/* assetRecord */0]);
}

function unsafeGetAssetTree(editorState) {
  return AssetTreeAssetService$WonderEditor.unsafeGetAssetTree(editorState[/* assetRecord */0]);
}

function setAsseTree(assetTree, editorState) {
  return /* record */[
          /* assetRecord */AssetTreeAssetService$WonderEditor.setAssetTree(assetTree, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* loopId */editorState[/* loopId */3]
        ];
}

export {
  getCurrentTreeNode       ,
  unsafeGetCurrentTreeNode ,
  clearCurrentTreeNode     ,
  setCurrentTreeNode       ,
  getIndex                 ,
  setIndex                 ,
  getFileMap               ,
  setFileMap               ,
  getAssetTree             ,
  unsafeGetAssetTree       ,
  setAsseTree              ,
  
}
/* AssetTreeAssetService-WonderEditor Not a pure module */
