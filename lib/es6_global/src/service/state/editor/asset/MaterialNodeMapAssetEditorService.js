

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as MaterialNodeMapAssetService$WonderEditor from "../../../record/editor/asset/MaterialNodeMapAssetService.js";

function getMaterialNodeMap(editorState) {
  return MaterialNodeMapAssetService$WonderEditor.getMaterialNodeMap(editorState[/* assetRecord */2]);
}

function setMaterialNodeMap(materialNodeMap, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */MaterialNodeMapAssetService$WonderEditor.setMaterialNodeMap(materialNodeMap, editorState[/* assetRecord */2]),
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
  return MaterialNodeMapAssetService$WonderEditor.unsafeGetResult(nodeId, editorState[/* assetRecord */2]);
}

function setResult(nodeId, result, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */MaterialNodeMapAssetService$WonderEditor.setResult(nodeId, result, editorState[/* assetRecord */2]),
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

function getParentFolderNodeId(nodeId, materialNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(nodeId, materialNodeMap)[/* parentFolderNodeId */0];
}

function getType(nodeId, materialNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(nodeId, materialNodeMap)[/* type_ */1];
}

function buildMaterialNodeResult(parentFolderNodeId, type_, materialComponent) {
  return /* record */[
          /* parentFolderNodeId */parentFolderNodeId,
          /* type_ */type_,
          /* materialComponent */materialComponent
        ];
}

function setMaterialNodeResultParent(parentFolderNodeId, materialNodeResult) {
  return /* record */[
          /* parentFolderNodeId */parentFolderNodeId,
          /* type_ */materialNodeResult[/* type_ */1],
          /* materialComponent */materialNodeResult[/* materialComponent */2]
        ];
}

function getValidValues(editorState) {
  return SparseMapService$WonderEditor.getValidValues(MaterialNodeMapAssetService$WonderEditor.getMaterialNodeMap(editorState[/* assetRecord */2]));
}

function getResults(editorState) {
  return SparseMapService$WonderEditor.getValidDataArr(MaterialNodeMapAssetService$WonderEditor.getMaterialNodeMap(editorState[/* assetRecord */2]));
}

function remove(nodeId, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */MaterialNodeMapAssetService$WonderEditor.remove(nodeId, editorState[/* assetRecord */2]),
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

export {
  getMaterialNodeMap ,
  setMaterialNodeMap ,
  unsafeGetResult ,
  setResult ,
  getParentFolderNodeId ,
  getType ,
  buildMaterialNodeResult ,
  setMaterialNodeResultParent ,
  getValidValues ,
  getResults ,
  remove ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
