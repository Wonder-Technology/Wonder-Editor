

import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as FolderNodeMapAssetService$WonderEditor from "../../../record/editor/asset/FolderNodeMapAssetService.js";

function getFolderNodeMap(editorState) {
  return FolderNodeMapAssetService$WonderEditor.getFolderNodeMap(editorState[/* assetRecord */2]);
}

function setFolderNodeMap(folderNodeMap, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */FolderNodeMapAssetService$WonderEditor.setFolderNodeMap(folderNodeMap, editorState[/* assetRecord */2]),
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

function unsafeGetResult(nodeId, editorState) {
  return FolderNodeMapAssetService$WonderEditor.unsafeGetResult(nodeId, editorState[/* assetRecord */2]);
}

function setResult(nodeId, result, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */FolderNodeMapAssetService$WonderEditor.setResult(nodeId, result, editorState[/* assetRecord */2]),
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

function getFolderName(currentNodeId, folderNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, folderNodeMap)[/* name */0];
}

function getFolderParentId(currentNodeId, folderNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, folderNodeMap)[/* parentFolderNodeId */1];
}

function buildFolderNodeResult(parentFolderNodeId, name) {
  return /* record */[
          /* name */name,
          /* parentFolderNodeId */parentFolderNodeId
        ];
}

function renameFolderNodeResult(name, folderNodeResult) {
  return /* record */[
          /* name */name,
          /* parentFolderNodeId */folderNodeResult[/* parentFolderNodeId */1]
        ];
}

function setFolderNodeResultParent(parentFolderNodeId, folderNodeResult) {
  return /* record */[
          /* name */folderNodeResult[/* name */0],
          /* parentFolderNodeId */parentFolderNodeId
        ];
}

export {
  getFolderNodeMap ,
  setFolderNodeMap ,
  unsafeGetResult ,
  setResult ,
  getFolderName ,
  getFolderParentId ,
  buildFolderNodeResult ,
  renameFolderNodeResult ,
  setFolderNodeResultParent ,
  
}
/* FolderNodeMapAssetService-WonderEditor Not a pure module */
