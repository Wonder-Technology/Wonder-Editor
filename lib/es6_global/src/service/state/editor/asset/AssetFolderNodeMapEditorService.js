

import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as FolderNodeMapAssetService$WonderEditor from "../../../record/editor/asset/FolderNodeMapAssetService.js";

function getFolderNodeMap(editorState) {
  return FolderNodeMapAssetService$WonderEditor.getFolderNodeMap(editorState[/* assetRecord */1]);
}

function setFolderNodeMap(folderNodeMap, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */FolderNodeMapAssetService$WonderEditor.setFolderNodeMap(folderNodeMap, editorState[/* assetRecord */1]),
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

function setResult(index, result, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */FolderNodeMapAssetService$WonderEditor.setResult(index, result, editorState[/* assetRecord */1]),
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

function getFolderName(currentNodeId, folderNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, folderNodeMap)[/* name */0];
}

function getFolderParentId(currentNodeId, folderNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, folderNodeMap)[/* parentId */1];
}

function buildFolderResult(parentId, name) {
  return /* record */[
          /* name */name,
          /* parentId */parentId
        ];
}

function renameFolderNodeResult(name, folderNodeResult) {
  return /* record */[
          /* name */name,
          /* parentId */folderNodeResult[/* parentId */1]
        ];
}

function setFolderNodeResultParent(parentId, folderNodeResult) {
  return /* record */[
          /* name */folderNodeResult[/* name */0],
          /* parentId */parentId
        ];
}

export {
  getFolderNodeMap ,
  setFolderNodeMap ,
  setResult ,
  getFolderName ,
  getFolderParentId ,
  buildFolderResult ,
  renameFolderNodeResult ,
  setFolderNodeResultParent ,
  
}
/* FolderNodeMapAssetService-WonderEditor Not a pure module */
