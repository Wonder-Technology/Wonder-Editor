

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
          /* sceneViewRecord */editorState[/* sceneViewRecord */2],
          /* gameViewRecord */editorState[/* gameViewRecord */3],
          /* eventRecord */editorState[/* eventRecord */4],
          /* imguiRecord */editorState[/* imguiRecord */5],
          /* inspectorRecord */editorState[/* inspectorRecord */6],
          /* currentDragSource */editorState[/* currentDragSource */7],
          /* currentSelectSource */editorState[/* currentSelectSource */8],
          /* loopId */editorState[/* loopId */9]
        ];
}

function clearAssetTreeRoot(editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */AssetTreeRootAssetService$WonderEditor.clearAsserTreeRoot(editorState[/* assetRecord */1]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */2],
          /* gameViewRecord */editorState[/* gameViewRecord */3],
          /* eventRecord */editorState[/* eventRecord */4],
          /* imguiRecord */editorState[/* imguiRecord */5],
          /* inspectorRecord */editorState[/* inspectorRecord */6],
          /* currentDragSource */editorState[/* currentDragSource */7],
          /* currentSelectSource */editorState[/* currentSelectSource */8],
          /* loopId */editorState[/* loopId */9]
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
  clearAssetTreeRoot ,
  getRootTreeNodeId ,
  
}
/* AssetTreeRootAssetService-WonderEditor Not a pure module */
