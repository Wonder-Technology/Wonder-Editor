'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var FileBox$WonderEditor = require("../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/atom_component/fileBox/ui/FileBox.js");
var TestTool$WonderEditor = require("../../../tool/TestTool.js");

function selectTextureNode(nodeId, $staropt$star, $staropt$star$1, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : -1;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return FileBox$WonderEditor.Method[/* onSelect */0](nodeId, dispatchFunc, $$event);
}

function selectCubemapNode(nodeId, $staropt$star, $staropt$star$1, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : -1;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return FileBox$WonderEditor.Method[/* onSelect */0](nodeId, dispatchFunc, $$event);
}

function selectMaterialNode(nodeId, $staropt$star, $staropt$star$1, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : -1;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return FileBox$WonderEditor.Method[/* onSelect */0](nodeId, dispatchFunc, $$event);
}

function selectFolderNode(nodeId, $staropt$star, $staropt$star$1, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : -1;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return FileBox$WonderEditor.Method[/* onSelect */0](nodeId, dispatchFunc, $$event);
}

function selectAssetBundleNode(nodeId, $staropt$star, $staropt$star$1, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : -1;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return FileBox$WonderEditor.Method[/* onSelect */0](nodeId, dispatchFunc, $$event);
}

function selectIMGUIExecFuncDataNode(nodeId, $staropt$star, $staropt$star$1, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : -1;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return FileBox$WonderEditor.Method[/* onSelect */0](nodeId, dispatchFunc, $$event);
}

function selectIMGUICustomControlNode(nodeId, $staropt$star, $staropt$star$1, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : -1;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return FileBox$WonderEditor.Method[/* onSelect */0](nodeId, dispatchFunc, $$event);
}

function selectIMGUISkinNode(nodeId, $staropt$star, $staropt$star$1, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : -1;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return FileBox$WonderEditor.Method[/* onSelect */0](nodeId, dispatchFunc, $$event);
}

function selectFntNode(nodeId, $staropt$star, $staropt$star$1, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : -1;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return FileBox$WonderEditor.Method[/* onSelect */0](nodeId, dispatchFunc, $$event);
}

exports.selectTextureNode = selectTextureNode;
exports.selectCubemapNode = selectCubemapNode;
exports.selectMaterialNode = selectMaterialNode;
exports.selectFolderNode = selectFolderNode;
exports.selectAssetBundleNode = selectAssetBundleNode;
exports.selectIMGUIExecFuncDataNode = selectIMGUIExecFuncDataNode;
exports.selectIMGUICustomControlNode = selectIMGUICustomControlNode;
exports.selectIMGUISkinNode = selectIMGUISkinNode;
exports.selectFntNode = selectFntNode;
/* FileBox-WonderEditor Not a pure module */
