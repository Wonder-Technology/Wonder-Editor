'use strict';

import * as IndexAssetService$WonderEditor                from "../../record/asset/IndexAssetService.js";
import * as FileMapAssetService$WonderEditor              from "../../record/asset/FileMapAssetService.js";
import * as AssetTreeAssetService$WonderEditor            from "../../record/asset/AssetTreeAssetService.js";
import * as FolderArrayAssetService$WonderEditor          from "../../record/asset/FolderArrayAssetService.js";
import * as CurrentAssetFileNodeAssetService$WonderEditor from "../../record/asset/CurrentAssetFileNodeAssetService.js";
import * as CurrentAssetTreeNodeAssetService$WonderEditor from "../../record/asset/CurrentAssetTreeNodeAssetService.js";

function unsafeGetFolderArray(editorState) {
  return FolderArrayAssetService$WonderEditor.unsafeGetFolderArray(editorState[/* assetRecord */0]);
}

function setFolderArray(folderArray, editorState) {
  return /* record */[
          /* assetRecord */FolderArrayAssetService$WonderEditor.setFolderArray(folderArray, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function getCurrentAssetFileNode(editorState) {
  return CurrentAssetFileNodeAssetService$WonderEditor.getCurrentAssetFileNode(editorState[/* assetRecord */0]);
}

function unsafeGetCurrentAssetFileNode(editorState) {
  return CurrentAssetFileNodeAssetService$WonderEditor.unsafeGetCurrentAssetFileNode(editorState[/* assetRecord */0]);
}

function clearCurrentAssetFileNode(editorState) {
  return /* record */[
          /* assetRecord */CurrentAssetFileNodeAssetService$WonderEditor.clearCurrentAssetFileNode(editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function setCurrentAssetFileNode(currentAssetFileNode, editorState) {
  return /* record */[
          /* assetRecord */CurrentAssetFileNodeAssetService$WonderEditor.setCurrentAssetFileNode(currentAssetFileNode, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentSign */editorState[/* currentSign */2],
          /* currentSource */editorState[/* currentSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

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

function setFileMap(fileMap, editorState) {
  return /* record */[
          /* assetRecord */FileMapAssetService$WonderEditor.setFileMap(fileMap, editorState[/* assetRecord */0]),
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
  unsafeGetFolderArray          ,
  setFolderArray                ,
  getCurrentAssetFileNode       ,
  unsafeGetCurrentAssetFileNode ,
  clearCurrentAssetFileNode     ,
  setCurrentAssetFileNode       ,
  getCurrentAssetTreeNode       ,
  unsafeGetCurrentAssetTreeNode ,
  clearCurrentAssetTreeNode     ,
  setCurrentAssetTreeNode       ,
  getIndex                      ,
  setIndex                      ,
  unsafeGetFileMap              ,
  setFileMap                    ,
  getAssetTree                  ,
  unsafeGetAssetTree            ,
  clearAssetTree                ,
  setAsseTree                   ,
  
}
/* AssetTreeAssetService-WonderEditor Not a pure module */
