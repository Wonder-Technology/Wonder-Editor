'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../../../../tool/TestTool.js");
var OptionService$WonderEditor = require("../../../../../../../../../src/service/primitive/OptionService.js");
var StateEditorService$WonderEditor = require("../../../../../../../../../src/service/state/editor/StateEditorService.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../../../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var MainEditorBasicMaterialForAsset$WonderEditor = require("../../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/material_Inspector/atom_component/basic_material/MainEditorBasicMaterialForAsset.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

function changeColor(material, color) {
  return MainEditorBasicMaterialForAsset$WonderEditor.Method[/* changeColor */0](material, color);
}

function closeColorPicker(material, currentNodeId, color, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(MainEditorBasicMaterialForAsset$WonderEditor.Method[/* closeColorPick */1], /* tuple */[
              uiState,
              dispatchFunc
            ], /* tuple */[
              material,
              currentNodeId
            ], color);
}

function judgeImgCanvasSnapshotIsStoreInImageDataMap(addedMaterialNodeId, imgCanvasFakeBase64Str) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedMaterialNodeId, editorState));
  var param = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* snapshotImageDataIndex */2], editorState);
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param[/* base64 */0])), imgCanvasFakeBase64Str);
}

exports.changeColor = changeColor;
exports.closeColorPicker = closeColorPicker;
exports.judgeImgCanvasSnapshotIsStoreInImageDataMap = judgeImgCanvasSnapshotIsStoreInImageDataMap;
/* Wonder_jest Not a pure module */
