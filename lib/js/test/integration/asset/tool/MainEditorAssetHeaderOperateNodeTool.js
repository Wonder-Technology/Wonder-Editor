'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../tool/TestTool.js");
var MainEditorAssetHeader$WonderEditor = require("../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/header/ui/MainEditorAssetHeader.js");
var MainEditorAssetNodeTool$WonderEditor = require("./MainEditorAssetNodeTool.js");

function removeNode($staropt$star, $staropt$star$1, nodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  MainEditorAssetNodeTool$WonderEditor.setCurrentNodeId(nodeId);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* removeAssetNode */1], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function removeTextureNode($staropt$star, $staropt$star$1, textureNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, uiState, textureNodeId, /* () */0);
}

function removeMaterialNode($staropt$star, $staropt$star$1, materialNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, uiState, materialNodeId, /* () */0);
}

function removeScriptEventFunctionNode($staropt$star, $staropt$star$1, scriptEventFunctionNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, uiState, scriptEventFunctionNodeId, /* () */0);
}

function removeScriptAttributeNode($staropt$star, $staropt$star$1, scriptAttributeNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, uiState, scriptAttributeNodeId, /* () */0);
}

function removeAssetBundleNode($staropt$star, $staropt$star$1, assetBundleNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, uiState, assetBundleNodeId, /* () */0);
}

function removeFolderNode($staropt$star, $staropt$star$1, folderNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, uiState, folderNodeId, /* () */0);
}

function removeWDBNode($staropt$star, $staropt$star$1, wdbNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, uiState, wdbNodeId, /* () */0);
}

function removeCubemapNode($staropt$star, $staropt$star$1, cubemapNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, uiState, cubemapNodeId, /* () */0);
}

function addFolder($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addFolder */0], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function addMaterial($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addMaterial */3], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function addScriptEventFunction($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addScriptEventFunction */4], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function addScriptAttribute($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addScriptAttribute */5], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function addCubemap($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addCubemap */6], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function addIMGUIExecFuncData($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addIMGUIExecFuncData */7], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function addIMGUICustomControl($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addIMGUICustomControl */9], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function addIMGUISkin($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addIMGUISkin */8], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function addFnt($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addFnt */10], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

exports.removeNode = removeNode;
exports.removeTextureNode = removeTextureNode;
exports.removeMaterialNode = removeMaterialNode;
exports.removeScriptEventFunctionNode = removeScriptEventFunctionNode;
exports.removeScriptAttributeNode = removeScriptAttributeNode;
exports.removeAssetBundleNode = removeAssetBundleNode;
exports.removeFolderNode = removeFolderNode;
exports.removeWDBNode = removeWDBNode;
exports.removeCubemapNode = removeCubemapNode;
exports.addFolder = addFolder;
exports.addMaterial = addMaterial;
exports.addScriptEventFunction = addScriptEventFunction;
exports.addScriptAttribute = addScriptAttribute;
exports.addCubemap = addCubemap;
exports.addIMGUIExecFuncData = addIMGUIExecFuncData;
exports.addIMGUICustomControl = addIMGUICustomControl;
exports.addIMGUISkin = addIMGUISkin;
exports.addFnt = addFnt;
/* TestTool-WonderEditor Not a pure module */
