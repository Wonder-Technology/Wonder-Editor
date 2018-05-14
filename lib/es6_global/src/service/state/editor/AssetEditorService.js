'use strict';

import * as IndexAssetService$WonderEditor           from "../../record/asset/IndexAssetService.js";
import * as FileMapAssetService$WonderEditor         from "../../record/asset/FileMapAssetService.js";
import * as AssetTreeAssetService$WonderEditor       from "../../record/asset/AssetTreeAssetService.js";
import * as CurrentFileAssetService$WonderEditor     from "../../record/asset/CurrentFileAssetService.js";
import * as CurrentTreeNodeAssetService$WonderEditor from "../../record/asset/CurrentTreeNodeAssetService.js";

function getCurrentFile(editorState) {
  return CurrentFileAssetService$WonderEditor.getCurrentFile(editorState[/* assetRecord */0]);
}

function unsafeGetCurrentFile(editorState) {
  return CurrentFileAssetService$WonderEditor.unsafeGetCurrentFile(editorState[/* assetRecord */0]);
}

function clearCurrentFile(editorState) {
  return /* record */[
          /* assetRecord */CurrentFileAssetService$WonderEditor.clearCurrentFile(editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function setCurrentFile(currentFile, editorState) {
  return /* record */[
          /* assetRecord */CurrentFileAssetService$WonderEditor.setCurrentFile(currentFile, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

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
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function setCurrentTreeNode(currentTreeNode, editorState) {
  return /* record */[
          /* assetRecord */CurrentTreeNodeAssetService$WonderEditor.setCurrentTreeNode(currentTreeNode, editorState[/* assetRecord */0]),
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

function unsafeGetFileMap(editorState) {
  return FileMapAssetService$WonderEditor.unsafeGetFileMap(editorState[/* assetRecord */0]);
}

function setFileMap(imageMap, editorState) {
  return /* record */[
          /* assetRecord */FileMapAssetService$WonderEditor.setFileMap(imageMap, editorState[/* assetRecord */0]),
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
  getCurrentFile           ,
  unsafeGetCurrentFile     ,
  clearCurrentFile         ,
  setCurrentFile           ,
  getCurrentTreeNode       ,
  unsafeGetCurrentTreeNode ,
  clearCurrentTreeNode     ,
  setCurrentTreeNode       ,
  getIndex                 ,
  setIndex                 ,
  unsafeGetFileMap         ,
  setFileMap               ,
  getAssetTree             ,
  unsafeGetAssetTree       ,
  setAsseTree              ,
  
}
/* AssetTreeAssetService-WonderEditor Not a pure module */
