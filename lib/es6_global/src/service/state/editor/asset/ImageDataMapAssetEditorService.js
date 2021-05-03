

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Base64Service$WonderEditor from "../../../primitive/Base64Service.js";
import * as Uint8ArrayService$WonderEditor from "../../../primitive/Uint8ArrayService.js";
import * as IndexAssetEditorService$WonderEditor from "./IndexAssetEditorService.js";
import * as ImageDataMapAssetService$WonderEditor from "../../../record/editor/asset/ImageDataMapAssetService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function getMap(editorState) {
  return editorState[/* assetRecord */5][/* imageDataMap */5];
}

function setMap(map, editorState) {
  var init = editorState[/* assetRecord */5];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
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
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function clearMap(editorState) {
  var init = editorState[/* assetRecord */5];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord : record */[
            /* nodeIndex */init[/* nodeIndex */0],
            /* imageDataMapIndex */init[/* imageDataMapIndex */1],
            /* tree */init[/* tree */2],
            /* currentNodeId */init[/* currentNodeId */3],
            /* selectedFolderNodeIdInAssetTree */init[/* selectedFolderNodeIdInAssetTree */4],
            /* imageDataMap */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* geometryData */init[/* geometryData */6],
            /* materialData */init[/* materialData */7]
          ],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function getData(index, editorState) {
  return ImageDataMapAssetService$WonderEditor.getData(index, editorState[/* assetRecord */5]);
}

function unsafeGetData(index, editorState) {
  return ImageDataMapAssetService$WonderEditor.unsafeGetData(index, editorState[/* assetRecord */5]);
}

function setData(index, data, editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */ImageDataMapAssetService$WonderEditor.setData(index, data, editorState[/* assetRecord */5]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function _getImageDataIndexByBase64(imageBase64, editorState) {
  var match = ImmutableSparseMapService$WonderCommonlib.getValidDataArr(editorState[/* assetRecord */5][/* imageDataMap */5]).find((function (param) {
          return Base64Service$WonderEditor.isBase64Equal(imageBase64, param[1][/* base64 */0]);
        }));
  if (match !== undefined) {
    return match[0];
  }
  
}

function addImageDataIfBase64NotExist(base64, fileName, mimeType, editorState) {
  var match = _getImageDataIndexByBase64(base64, editorState);
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

function _getImageDataIndexByUint8Array(imageUint8Array, editorState) {
  var match = ImmutableSparseMapService$WonderCommonlib.getValidDataArr(editorState[/* assetRecord */5][/* imageDataMap */5]).find((function (param) {
          return Uint8ArrayService$WonderEditor.isUint8ArrayEqual(Caml_option.some(imageUint8Array), param[1][/* uint8Array */1]);
        }));
  if (match !== undefined) {
    return match[0];
  }
  
}

function addImageDataIfUint8ArrayNotExist(uint8Array, name, mimeType, editorState) {
  var match = _getImageDataIndexByUint8Array(uint8Array, editorState);
  if (match !== undefined) {
    return /* tuple */[
            editorState,
            match
          ];
  } else {
    var match$1 = IndexAssetEditorService$WonderEditor.generateImageDataMapIndex(editorState);
    var newImageDataIndex = match$1[1];
    return /* tuple */[
            setData(newImageDataIndex, ImageDataMapAssetService$WonderEditor.buildData(undefined, Caml_option.some(uint8Array), name, mimeType, undefined, /* () */0), match$1[0]),
            newImageDataIndex
          ];
  }
}

function removeData(index, editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */ImageDataMapAssetService$WonderEditor.removeData(index, editorState[/* assetRecord */5]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function unsafeGetUint8Array(index, editorState) {
  return ImageDataMapAssetService$WonderEditor.unsafeGetData(index, editorState[/* assetRecord */5])[/* uint8Array */1];
}

function getValidValues(editorState) {
  return ImmutableSparseMapService$WonderCommonlib.getValidValues(editorState[/* assetRecord */5][/* imageDataMap */5]);
}

export {
  getMap ,
  setMap ,
  clearMap ,
  getData ,
  unsafeGetData ,
  setData ,
  _getImageDataIndexByBase64 ,
  addImageDataIfBase64NotExist ,
  _getImageDataIndexByUint8Array ,
  addImageDataIfUint8ArrayNotExist ,
  removeData ,
  unsafeGetUint8Array ,
  getValidValues ,
  
}
/* No side effect */
