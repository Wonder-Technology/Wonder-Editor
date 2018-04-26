'use strict';

import * as IndexAssetService$WonderEditor           from "../../record/asset/IndexAssetService.js";
import * as ImageMapAssetService$WonderEditor        from "../../record/asset/ImageMapAssetService.js";
import * as AssetTreeAssetService$WonderEditor       from "../../record/asset/AssetTreeAssetService.js";
import * as CurrentTreeNodeAssetService$WonderEditor from "../../record/asset/CurrentTreeNodeAssetService.js";

function getCurrentTreeNode(editorState) {
  return CurrentTreeNodeAssetService$WonderEditor.getCurrentTreeNode(editorState[/* assetRecord */0]);
}

function unsafeGetCurrentTreeNode(editorState) {
  return CurrentTreeNodeAssetService$WonderEditor.unsafeGetCurrentTreeNode(editorState[/* assetRecord */0]);
}

function setCurrentTreeNode(currentTreeNode, editorState) {
  return /* record */[
          /* assetRecord */CurrentTreeNodeAssetService$WonderEditor.setCurrentTreeNode(currentTreeNode, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentTree */editorState[/* currentTree */2],
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
          /* currentTree */editorState[/* currentTree */2],
          /* loopId */editorState[/* loopId */3]
        ];
}

function unsafeGetImageMap(editorState) {
  return ImageMapAssetService$WonderEditor.unsafeGetImageMap(editorState[/* assetRecord */0]);
}

function setImageMap(imageMap, editorState) {
  return /* record */[
          /* assetRecord */ImageMapAssetService$WonderEditor.setImageMap(imageMap, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentTree */editorState[/* currentTree */2],
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
          /* currentTree */editorState[/* currentTree */2],
          /* loopId */editorState[/* loopId */3]
        ];
}

export {
  getCurrentTreeNode       ,
  unsafeGetCurrentTreeNode ,
  setCurrentTreeNode       ,
  getIndex                 ,
  setIndex                 ,
  unsafeGetImageMap        ,
  setImageMap              ,
  getAssetTree             ,
  unsafeGetAssetTree       ,
  setAsseTree              ,
  
}
/* ImageMapAssetService-WonderEditor Not a pure module */
