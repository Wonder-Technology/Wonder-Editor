

import * as IndexAssetService$WonderEditor from "../../../record/editor/asset/IndexAssetService.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../record/editor/asset/AssetTreeRootAssetService.js";

function getAssetTreeRoot(editorState) {
  return AssetTreeRootAssetService$WonderEditor.getAssetTreeRoot(editorState[/* assetRecord */2]);
}

function unsafeGetAssetTreeRoot(editorState) {
  return AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(editorState[/* assetRecord */2]);
}

function setAssetTreeRoot(assetTreeRoot, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */AssetTreeRootAssetService$WonderEditor.setAssetTreeRoot(assetTreeRoot, editorState[/* assetRecord */2]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

function clearAssetTreeRoot(editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */AssetTreeRootAssetService$WonderEditor.clearAsserTreeRoot(editorState[/* assetRecord */2]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

function getRootTreeNodeId(editorState) {
  var match = AssetTreeRootAssetService$WonderEditor.getAssetTreeRoot(editorState[/* assetRecord */2]);
  if (match !== undefined) {
    return match[/* nodeId */0];
  } else {
    return IndexAssetService$WonderEditor.getIndex(editorState[/* assetRecord */2]);
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
