

import * as WDBService$WonderEditor from "../../../primitive/WDBService.js";
import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as WDBNodeMapAssetService$WonderEditor from "../../../record/editor/asset/WDBNodeMapAssetService.js";

function getWDBNodeMap(editorState) {
  return WDBNodeMapAssetService$WonderEditor.getWDBNodeMap(editorState[/* assetRecord */2]);
}

function setWDBNodeMap(wdbNodeMap, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */WDBNodeMapAssetService$WonderEditor.setWDBNodeMap(wdbNodeMap, editorState[/* assetRecord */2]),
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

function setResult(index, result, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */WDBNodeMapAssetService$WonderEditor.setResult(index, result, editorState[/* assetRecord */2]),
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

function getWDBBaseName(nodeId, wdbNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(nodeId, wdbNodeMap)[/* name */0];
}

function getWDBTotalName(nodeId, wdbNodeMap) {
  var param = SparseMapService$WonderCommonlib.unsafeGet(nodeId, wdbNodeMap);
  return param[/* name */0] + WDBService$WonderEditor.getExtName(/* () */0);
}

function getWDBParentId(nodeId, wdbNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(nodeId, wdbNodeMap)[/* parentFolderNodeId */1];
}

function buildWDBNodeResult(name, parentFolderNodeId, wdbGameObject) {
  return /* record */[
          /* name */name,
          /* parentFolderNodeId */parentFolderNodeId,
          /* wdbGameObject */wdbGameObject
        ];
}

function renameWDBNodeResult(name, wdbNodeResult) {
  return /* record */[
          /* name */name,
          /* parentFolderNodeId */wdbNodeResult[/* parentFolderNodeId */1],
          /* wdbGameObject */wdbNodeResult[/* wdbGameObject */2]
        ];
}

function setWDBNodeResultParent(parentFolderNodeId, wdbNodeResult) {
  return /* record */[
          /* name */wdbNodeResult[/* name */0],
          /* parentFolderNodeId */parentFolderNodeId,
          /* wdbGameObject */wdbNodeResult[/* wdbGameObject */2]
        ];
}

function getValidValues(editorState) {
  return SparseMapService$WonderEditor.getValidValues(WDBNodeMapAssetService$WonderEditor.getWDBNodeMap(editorState[/* assetRecord */2]));
}

export {
  getWDBNodeMap ,
  setWDBNodeMap ,
  setResult ,
  getWDBBaseName ,
  getWDBTotalName ,
  getWDBParentId ,
  buildWDBNodeResult ,
  renameWDBNodeResult ,
  setWDBNodeResultParent ,
  getValidValues ,
  
}
/* No side effect */
