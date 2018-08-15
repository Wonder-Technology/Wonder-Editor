

import * as IndexAssetService$WonderEditor from "../../../record/editor/asset/IndexAssetService.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../record/editor/asset/AssetTreeRootAssetService.js";

function getAssetTreeRoot(editorState) {
  return AssetTreeRootAssetService$WonderEditor.getAssetTreeRoot(editorState[/* assetRecord */1]);
}

function unsafeGetAssetTreeRoot(editorState) {
  return AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(editorState[/* assetRecord */1]);
}

function setAssetTreeRoot(assetTreeRoot, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */AssetTreeRootAssetService$WonderEditor.setAssetTreeRoot(assetTreeRoot, editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

function getRootTreeNodeId(editorState) {
  var match = AssetTreeRootAssetService$WonderEditor.getAssetTreeRoot(editorState[/* assetRecord */1]);
  if (match !== undefined) {
    return match[/* id */0];
  } else {
    return IndexAssetService$WonderEditor.getIndex(editorState[/* assetRecord */1]);
  }
}

export {
  getAssetTreeRoot ,
  unsafeGetAssetTreeRoot ,
  setAssetTreeRoot ,
  getRootTreeNodeId ,
  
}
/* AssetTreeRootAssetService-WonderEditor Not a pure module */
