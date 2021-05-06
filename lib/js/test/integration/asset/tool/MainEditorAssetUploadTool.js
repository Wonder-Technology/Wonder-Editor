'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Zip$WonderBsJszip = require("wonder-bs-jszip/lib/js/src/zip.js");
var TestTool$WonderEditor = require("../../../tool/TestTool.js");
var BaseEventTool$WonderEditor = require("../../../tool/ui/BaseEventTool.js");
var MainEditorAssetIdTool$WonderEditor = require("./MainEditorAssetIdTool.js");
var AssetHeaderFileLoadEventHandler$WonderEditor = require("../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/header/eventHandler/AssetHeaderFileLoadEventHandler.js");

function loadOneTexture($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var imgName = $staropt$star$2 !== undefined ? $staropt$star$2 : "loadImg.png";
  var imgSrc = $staropt$star$3 !== undefined ? $staropt$star$3 : "newImgBase64";
  var uploadedTextureNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  return Most.drain(Curry._3(AssetHeaderFileLoadEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                    uiState,
                    dispatchFunc
                  ], Zip$WonderBsJszip.create, BaseEventTool$WonderEditor.buildOneTextureFileEvent(imgName, imgSrc, /* () */0))).then((function (param) {
                return Promise.resolve(uploadedTextureNodeId);
              }));
}

function loadOneWDB(arrayBuffer, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var fileName = $staropt$star$2 !== undefined ? $staropt$star$2 : "Wdb";
  var uploadedWDBNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  return Most.drain(Curry._3(AssetHeaderFileLoadEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                    uiState,
                    dispatchFunc
                  ], Zip$WonderBsJszip.create, BaseEventTool$WonderEditor.buildWDBFileEvent(fileName, arrayBuffer))).then((function (param) {
                return Promise.resolve(uploadedWDBNodeId);
              }));
}

function loadOneGLB(arrayBuffer, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var fileName = $staropt$star$2 !== undefined ? $staropt$star$2 : "Glb";
  var uploadedWDBNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  return Most.drain(Curry._3(AssetHeaderFileLoadEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                    uiState,
                    dispatchFunc
                  ], Zip$WonderBsJszip.create, BaseEventTool$WonderEditor.buildGLBFileEvent(fileName, arrayBuffer))).then((function (param) {
                return Promise.resolve(uploadedWDBNodeId);
              }));
}

function loadOneGLTFZip(sandbox, createJsZipFunc, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var fileName = $staropt$star$2 !== undefined ? $staropt$star$2 : "GltfZip";
  var uploadedWDBNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  return Most.drain(Curry._3(AssetHeaderFileLoadEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                    uiState,
                    dispatchFunc
                  ], createJsZipFunc, BaseEventTool$WonderEditor.buildGLTFZipFileEvent(fileName))).then((function (param) {
                return Promise.resolve(uploadedWDBNodeId);
              }));
}

function loadOneAssetBundleZip(sandbox, createJsZipFunc, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var fileName = $staropt$star$2 !== undefined ? $staropt$star$2 : "AssetBundleZip";
  return Most.drain(Curry._3(AssetHeaderFileLoadEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                    uiState,
                    dispatchFunc
                  ], createJsZipFunc, BaseEventTool$WonderEditor.buildAssetBundleZipFileEvent(fileName))).then((function (param) {
                return Promise.resolve(/* () */0);
              }));
}

function loadOneAssetBundle($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var fileName = $staropt$star$2 !== undefined ? $staropt$star$2 : "A.rab";
  var assetBundle = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : new ArrayBuffer(10);
  var uploadedWDBNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  return Most.drain(Curry._3(AssetHeaderFileLoadEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                    uiState,
                    dispatchFunc
                  ], Zip$WonderBsJszip.create, BaseEventTool$WonderEditor.buildAssetBundleFileEvent(fileName, assetBundle))).then((function (param) {
                return Promise.resolve(uploadedWDBNodeId);
              }));
}

exports.loadOneTexture = loadOneTexture;
exports.loadOneWDB = loadOneWDB;
exports.loadOneGLB = loadOneGLB;
exports.loadOneGLTFZip = loadOneGLTFZip;
exports.loadOneAssetBundleZip = loadOneAssetBundleZip;
exports.loadOneAssetBundle = loadOneAssetBundle;
/* most Not a pure module */
