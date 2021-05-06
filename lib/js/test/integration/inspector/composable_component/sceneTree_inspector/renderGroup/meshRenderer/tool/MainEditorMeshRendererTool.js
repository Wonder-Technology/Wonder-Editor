'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var ArrayService$WonderEditor = require("../../../../../../../../src/service/atom/ArrayService.js");
var GameObjectTool$WonderEditor = require("../../../../../../../tool/GameObjectTool.js");
var MainEditorMeshRenderer$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/meshRenderer/ui/MainEditorMeshRenderer.js");

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.unsafeGetNth(index, array);
}

function getDrawModeLineType(param) {
  return /* Lines */1;
}

function getDrawModePointType(param) {
  return /* Points */0;
}

function getDrawModeTriangleFanType(param) {
  return /* Triangle_fan */6;
}

function changeMode(value, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var meshRenderer = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMeshRenderer(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorMeshRenderer$WonderEditor.Method[/* changeMode */0], /* tuple */[
              uiState,
              dispatchFunc
            ], meshRenderer, value);
}

exports._getFromArray = _getFromArray;
exports.getDrawModeLineType = getDrawModeLineType;
exports.getDrawModePointType = getDrawModePointType;
exports.getDrawModeTriangleFanType = getDrawModeTriangleFanType;
exports.changeMode = changeMode;
/* TestTool-WonderEditor Not a pure module */
