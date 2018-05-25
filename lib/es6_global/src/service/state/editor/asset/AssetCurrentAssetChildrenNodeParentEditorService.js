'use strict';

import * as CurrentAssetChildrenNodeParentAssetService$WonderEditor from "../../../record/editor/asset/CurrentAssetChildrenNodeParentAssetService.js";

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

export {
  getCurrentAssetChildrenNodeParent       ,
  unsafeGetCurrentAssetChildrenNodeParent ,
  clearCurrentAssetChildrenNodeParent     ,
  setCurrentAssetChildrenNodeParent       ,
  
}
/* CurrentAssetChildrenNodeParentAssetService-WonderEditor Not a pure module */
