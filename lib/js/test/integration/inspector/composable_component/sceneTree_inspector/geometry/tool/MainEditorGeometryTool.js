'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var OptionService$WonderEditor = require("../../../../../../../src/service/primitive/OptionService.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var MainEditorGeometry$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/geometry/ui/MainEditorGeometry.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var GeometryDataAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/GeometryDataAssetEditorService.js");
var PrepareDefaultComponentLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/PrepareDefaultComponentLogicService.js");

function getBoxTexturedGeometryName(param) {
  return "Mesh";
}

function getDefaultCubeGeometryComponent($staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var param$1 = GeometryDataAssetEditorService$WonderEditor.getGeometryData(editorState);
  return OptionService$WonderEditor.unsafeGet(param$1[/* defaultCubeGeometryComponent */0]);
}

function getDefaultSphereGeometryComponent($staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var param$1 = GeometryDataAssetEditorService$WonderEditor.getGeometryData(editorState);
  return OptionService$WonderEditor.unsafeGet(param$1[/* defaultSphereGeometryComponent */1]);
}

function changeGeometry(sourceGeometry, targetGeometry, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var gameObject = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorGeometry$WonderEditor.Method[/* changeGeometry */0], /* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, /* tuple */[
              sourceGeometry,
              targetGeometry
            ]);
}

function getAllShowGeometrys(gameObject, engineState) {
  return MainEditorGeometry$WonderEditor.Method[/* getAllShowGeometrys */5](gameObject, engineState);
}

var getDefaultCubeGeometryName = PrepareDefaultComponentLogicService$WonderEditor.getDefaultCubeGeometryName;

var getDefaultSphereGeometryName = PrepareDefaultComponentLogicService$WonderEditor.getDefaultSphereGeometryName;

exports.getDefaultCubeGeometryName = getDefaultCubeGeometryName;
exports.getDefaultSphereGeometryName = getDefaultSphereGeometryName;
exports.getBoxTexturedGeometryName = getBoxTexturedGeometryName;
exports.getDefaultCubeGeometryComponent = getDefaultCubeGeometryComponent;
exports.getDefaultSphereGeometryComponent = getDefaultSphereGeometryComponent;
exports.changeGeometry = changeGeometry;
exports.getAllShowGeometrys = getAllShowGeometrys;
/* TestTool-WonderEditor Not a pure module */
