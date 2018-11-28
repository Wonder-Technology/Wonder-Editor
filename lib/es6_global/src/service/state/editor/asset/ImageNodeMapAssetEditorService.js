

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as ImageNodeMapAssetService$WonderEditor from "../../../record/editor/asset/ImageNodeMapAssetService.js";

function getImageNodeMap(editorState) {
  return ImageNodeMapAssetService$WonderEditor.getImageNodeMap(editorState[/* assetRecord */2]);
}

function setImageNodeMap(imageNodeMap, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */ImageNodeMapAssetService$WonderEditor.setImageNodeMap(imageNodeMap, editorState[/* assetRecord */2]),
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
  return ImageNodeMapAssetService$WonderEditor.unsafeGetResult(nodeId, editorState[/* assetRecord */2]);
}

function setResult(nodeId, imageResult, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */ImageNodeMapAssetService$WonderEditor.setResult(nodeId, imageResult, editorState[/* assetRecord */2]),
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

function buildImageNodeResult(base64, uint8Array, name, mimeType) {
  return /* record */[
          /* base64 */base64,
          /* uint8Array */uint8Array,
          /* blobObjectURL */undefined,
          /* name */name,
          /* mimeType */mimeType
        ];
}

function getUint8Array(nodeId, imageNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(nodeId, imageNodeMap)[/* uint8Array */1];
}

function getValidValues(editorState) {
  return SparseMapService$WonderEditor.getValidValues(ImageNodeMapAssetService$WonderEditor.getImageNodeMap(editorState[/* assetRecord */2]));
}

export {
  getImageNodeMap ,
  setImageNodeMap ,
  unsafeGetResult ,
  setResult ,
  buildImageNodeResult ,
  getUint8Array ,
  getValidValues ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
