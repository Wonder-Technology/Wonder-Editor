

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Base64Service$WonderEditor from "../../../primitive/Base64Service.js";
import * as Uint8ArrayService$WonderEditor from "../../../primitive/Uint8ArrayService.js";
import * as IndexAssetEditorService$WonderEditor from "./IndexAssetEditorService.js";
import * as ImageDataMapAssetService$WonderEditor from "../../../record/editor/asset/ImageDataMapAssetService.js";
import * as ImmutableSparseMapService$WonderEditor from "../../../atom/ImmutableSparseMapService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function getMap(editorState) {
  return editorState[/* assetRecord */2][/* imageDataMap */5];
}

function setMap(map, editorState) {
  var init = editorState[/* assetRecord */2];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord : record */[
            /* nodeIndex */init[/* nodeIndex */0],
            /* imageDataMapIndex */init[/* imageDataMapIndex */1],
            /* tree */init[/* tree */2],
            /* currentNodeId */init[/* currentNodeId */3],
            /* selectedFolderNodeIdInAssetTree */init[/* selectedFolderNodeIdInAssetTree */4],
            /* imageDataMap */map,
            /* geometryData */init[/* geometryData */6],
            /* materialData */init[/* materialData */7]
          ],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function unsafeGetData(index, editorState) {
  return ImageDataMapAssetService$WonderEditor.unsafeGetData(index, editorState[/* assetRecord */2]);
}

function setData(index, data, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */ImageDataMapAssetService$WonderEditor.setData(index, data, editorState[/* assetRecord */2]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function _getImageNodeIdByBase64(imageBase64, editorState) {
  var match = ImmutableSparseMapService$WonderEditor.getValidDataArr(editorState[/* assetRecord */2][/* imageDataMap */5]).find((function (param) {
          return Base64Service$WonderEditor.isBase64Equal(imageBase64, param[1][/* base64 */0]);
        }));
  if (match !== undefined) {
    return match[0];
  }
  
}

function addImageNodeByBase64(base64, fileName, mimeType, editorState) {
  var match = _getImageNodeIdByBase64(base64, editorState);
  if (match !== undefined) {
    return /* tuple */[
            editorState,
            match
          ];
  } else {
    var match$1 = IndexAssetEditorService$WonderEditor.generateImageDataMapIndex(editorState);
    var newImageDataIndex = match$1[1];
    return /* tuple */[
            setData(newImageDataIndex, ImageDataMapAssetService$WonderEditor.buildData(base64, undefined, fileName, mimeType, undefined, /* () */0), match$1[0]),
            newImageDataIndex
          ];
  }
}

function _getImageNodeIdByUint8Array(imageUint8Array, editorState) {
  var match = ImmutableSparseMapService$WonderEditor.getValidDataArr(editorState[/* assetRecord */2][/* imageDataMap */5]).find((function (param) {
          return Uint8ArrayService$WonderEditor.isUint8ArrayEqual(Js_primitive.some(imageUint8Array), param[1][/* uint8Array */1]);
        }));
  if (match !== undefined) {
    return match[0];
  }
  
}

function addImageNodeByUint8Array(uint8Array, name, mimeType, editorState) {
  var match = _getImageNodeIdByUint8Array(uint8Array, editorState);
  if (match !== undefined) {
    return /* tuple */[
            editorState,
            match
          ];
  } else {
    var match$1 = IndexAssetEditorService$WonderEditor.generateImageDataMapIndex(editorState);
    var newImageDataIndex = match$1[1];
    return /* tuple */[
            setData(newImageDataIndex, ImageDataMapAssetService$WonderEditor.buildData(undefined, Js_primitive.some(uint8Array), name, mimeType, undefined, /* () */0), match$1[0]),
            newImageDataIndex
          ];
  }
}

function removeData(index, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */ImageDataMapAssetService$WonderEditor.removeData(index, editorState[/* assetRecord */2]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function unsafeGetUint8Array(index, editorState) {
  return ImageDataMapAssetService$WonderEditor.unsafeGetData(index, editorState[/* assetRecord */2])[/* uint8Array */1];
}

function getValidValues(editorState) {
  return ImmutableSparseMapService$WonderCommonlib.getValidValues(editorState[/* assetRecord */2][/* imageDataMap */5]);
}

export {
  getMap ,
  setMap ,
  unsafeGetData ,
  setData ,
  _getImageNodeIdByBase64 ,
  addImageNodeByBase64 ,
  _getImageNodeIdByUint8Array ,
  addImageNodeByUint8Array ,
  removeData ,
  unsafeGetUint8Array ,
  getValidValues ,
  
}
/* ImageDataMapAssetService-WonderEditor Not a pure module */
