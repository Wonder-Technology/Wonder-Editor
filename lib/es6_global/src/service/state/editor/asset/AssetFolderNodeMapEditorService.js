

import * as FileNameService$WonderEditor from "../../../atom/FileNameService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as FolderNodeMapAssetService$WonderEditor from "../../../record/editor/asset/FolderNodeMapAssetService.js";

function getFolderNodeMap(editorState) {
  return FolderNodeMapAssetService$WonderEditor.getFolderNodeMap(editorState[/* assetRecord */1]);
}

function setFolderNodeMap(folderNodeMap, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */FolderNodeMapAssetService$WonderEditor.setFolderNodeMap(folderNodeMap, editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

function setResult(index, result, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */FolderNodeMapAssetService$WonderEditor.setResult(index, result, editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

function getFolderBaseNameAndExtName(currentNodeId, folderNodeMap) {
  return FileNameService$WonderEditor.getBaseNameAndExtName(SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, folderNodeMap)[/* name */0]);
}

export {
  getFolderNodeMap ,
  setFolderNodeMap ,
  setResult ,
  getFolderBaseNameAndExtName ,
  
}
/* FolderNodeMapAssetService-WonderEditor Not a pure module */
