'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../../../tool/TestTool.js");
var AssetInspector$WonderEditor = require("../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/ui/AssetInspector.js");
var NodeAssetService$WonderEditor = require("../../../../../../src/service/record/editor/asset/NodeAssetService.js");
var StateEditorService$WonderEditor = require("../../../../../../src/service/state/editor/StateEditorService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetTreeTool.js");

function renameAssetNode(param, nodeId, name) {
  return Curry._3(AssetInspector$WonderEditor.Method[/* renameAssetTreeNode */1], /* tuple */[
              param[0],
              param[1]
            ], nodeId, name);
}

function renameAssetCubemapNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetScriptAttributeNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetScriptEventFunctionNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetTextureNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetMaterialNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetWDBNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetAssetBundleNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetFolderNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetIMGUIExecFuncDataNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetIMGUICustomControlNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetIMGUISkinNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetFntNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function isFolderNameDisabled(nodeId) {
  return NodeAssetService$WonderEditor.isIdEqual(MainEditorAssetTreeTool$WonderEditor.getRootNodeId(StateEditorService$WonderEditor.getState(/* () */0)), nodeId);
}

var Rename = /* module */[
  /* renameAssetNode */renameAssetNode,
  /* renameAssetCubemapNode */renameAssetCubemapNode,
  /* renameAssetScriptAttributeNode */renameAssetScriptAttributeNode,
  /* renameAssetScriptEventFunctionNode */renameAssetScriptEventFunctionNode,
  /* renameAssetTextureNode */renameAssetTextureNode,
  /* renameAssetMaterialNode */renameAssetMaterialNode,
  /* renameAssetWDBNode */renameAssetWDBNode,
  /* renameAssetAssetBundleNode */renameAssetAssetBundleNode,
  /* renameAssetFolderNode */renameAssetFolderNode,
  /* renameAssetIMGUIExecFuncDataNode */renameAssetIMGUIExecFuncDataNode,
  /* renameAssetIMGUICustomControlNode */renameAssetIMGUICustomControlNode,
  /* renameAssetIMGUISkinNode */renameAssetIMGUISkinNode,
  /* renameAssetFntNode */renameAssetFntNode,
  /* isFolderNameDisabled */isFolderNameDisabled
];

function reducer($staropt$star, $staropt$star$1, nodeId, action, state, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return AssetInspector$WonderEditor.reducer(/* tuple */[
                uiState,
                dispatchFunc
              ], nodeId, action)(state);
}

exports.Rename = Rename;
exports.reducer = reducer;
/* TestTool-WonderEditor Not a pure module */
