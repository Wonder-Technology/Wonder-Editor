'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var BaseEventTool$WonderEditor = require("../../../../../../../tool/ui/BaseEventTool.js");
var ImportPackageTool$WonderEditor = require("../../../../../../header/import_package/tool/ImportPackageTool.js");
var CubemapTextureEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/texture/CubemapTextureEngineService.js");
var InspectorChangeCubemapWrapSEventHandler$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/cubemap_inspector/eventHandler/InspectorChangeCubemapWrapSEventHandler.js");
var InspectorChangeCubemapWrapTEventHandler$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/cubemap_inspector/eventHandler/InspectorChangeCubemapWrapTEventHandler.js");
var InspectorChangeCubemapMagFilterEventHandler$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/cubemap_inspector/eventHandler/InspectorChangeCubemapMagFilterEventHandler.js");
var InspectorChangeCubemapMinFilterEventHandler$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/cubemap_inspector/eventHandler/InspectorChangeCubemapMinFilterEventHandler.js");
var CubemapTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/imageDataMap/CubemapTextureImageDataMapAssetEditorService.js");
var LoadAndSetCubemapInspectorFaceSourceEventHandler$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/cubemap_inspector/atom_component/eventHanadler/LoadAndSetCubemapInspectorFaceSourceEventHandler.js");

function loadAndSetFaceSource($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, cubemapTexture, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var imgName = $staropt$star$2 !== undefined ? $staropt$star$2 : "loadImg.png";
  var imgSrc = $staropt$star$3 !== undefined ? $staropt$star$3 : ImportPackageTool$WonderEditor.buildBase64_1(/* () */0);
  var setSourceFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : CubemapTextureEngineService$WonderEditor.setPXSource;
  var setFormatFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : CubemapTextureEngineService$WonderEditor.setPXFormat;
  var setFaceImageDataFunc = $staropt$star$6 !== undefined ? $staropt$star$6 : CubemapTextureImageDataMapAssetEditorService$WonderEditor.setPXImageData;
  return Most.drain(Curry._3(LoadAndSetCubemapInspectorFaceSourceEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                  uiState,
                  dispatchFunc
                ], /* tuple */[
                  cubemapTexture,
                  setSourceFunc,
                  setFormatFunc,
                  setFaceImageDataFunc
                ], BaseEventTool$WonderEditor.buildFaceSourceFileEvent(imgName, imgSrc, /* () */0)));
}

function getWrapClampType(param) {
  return /* Clamp_to_edge */0;
}

function getWrapRepeatType(param) {
  return /* Repeat */2;
}

function getWrapMirroredRepeatType(param) {
  return /* Mirrored_repeat */1;
}

function getFilterLinearMipmapLinearType(param) {
  return /* Linear_mipmap_linear */5;
}

function getFilterNearestType(param) {
  return /* Nearest */0;
}

function getFilterNearestMipmapLinearType(param) {
  return /* Nearest_mipmap_linear */4;
}

function changeWrapS(cubemapTexture, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(InspectorChangeCubemapWrapSEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */3], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              cubemapTexture,
              value
            ]);
}

function changeWrapT(cubemapTexture, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(InspectorChangeCubemapWrapTEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */3], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              cubemapTexture,
              value
            ]);
}

function changeMagFilter(cubemapTexture, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(InspectorChangeCubemapMagFilterEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */3], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              cubemapTexture,
              value
            ]);
}

function changeMinFilter(cubemapTexture, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(InspectorChangeCubemapMinFilterEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */3], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              cubemapTexture,
              value
            ]);
}

exports.loadAndSetFaceSource = loadAndSetFaceSource;
exports.getWrapClampType = getWrapClampType;
exports.getWrapRepeatType = getWrapRepeatType;
exports.getWrapMirroredRepeatType = getWrapMirroredRepeatType;
exports.getFilterLinearMipmapLinearType = getFilterLinearMipmapLinearType;
exports.getFilterNearestType = getFilterNearestType;
exports.getFilterNearestMipmapLinearType = getFilterNearestMipmapLinearType;
exports.changeWrapS = changeWrapS;
exports.changeWrapT = changeWrapT;
exports.changeMagFilter = changeMagFilter;
exports.changeMinFilter = changeMinFilter;
/* most Not a pure module */
