'use strict';

import * as IndexAssetService$WonderEditor         from "../../../record/editor/asset/IndexAssetService.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../record/editor/asset/AssetTreeRootAssetService.js";

function getAssetTreeRoot(editorState) {
  return AssetTreeRootAssetService$WonderEditor.getAssetTreeRoot(editorState[/* assetRecord */0]);
}

function unsafeGetAssetTreeRoot(editorState) {
  return AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(editorState[/* assetRecord */0]);
}

function setAssetTreeRoot(assetTreeRoot, editorState) {
  return /* record */[
          /* assetRecord */AssetTreeRootAssetService$WonderEditor.setAssetTreeRoot(assetTreeRoot, editorState[/* assetRecord */0]),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* currentDragSource */editorState[/* currentDragSource */2],
          /* currentSelectSource */editorState[/* currentSelectSource */3],
          /* loopId */editorState[/* loopId */4]
        ];
}

function getRootTreeNodeId(editorState) {
  var assetRecord = editorState[/* assetRecord */0];
  var match = AssetTreeRootAssetService$WonderEditor.getAssetTreeRoot(assetRecord);
  if (match) {
    return match[0][/* id */0];
  } else {
    return IndexAssetService$WonderEditor.getIndex(assetRecord);
  }
}

export {
  getAssetTreeRoot       ,
  unsafeGetAssetTreeRoot ,
  setAssetTreeRoot       ,
  getRootTreeNodeId      ,
  
}
/* AssetTreeRootAssetService-WonderEditor Not a pure module */
