'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../../../tool/TestTool.js");
var ComponentBox$WonderEditor = require("../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/atom_component/componentBox/ui/ComponentBox.js");
var GameObjectTool$WonderEditor = require("../../../../../tool/GameObjectTool.js");

function _removeComponent(param, gameObject, type_) {
  return Curry._3(ComponentBox$WonderEditor.Method[/* removeComponent */0], /* tuple */[
              param[0],
              param[1]
            ], gameObject, type_);
}

function removeDirectionLightComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _removeComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, /* Light */6);
}

function removeCameraGroupComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _removeComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, /* CameraGroup */5);
}

function removeGeometryComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _removeComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, /* Geometry */2);
}

function removeRenderGroupComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _removeComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, /* RenderGroup */1);
}

function removeFlyCameraControllerComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _removeComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, /* FlyCameraController */4);
}

function removeArcballCameraControllerComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _removeComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, /* ArcballCameraController */3);
}

function removeScriptComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _removeComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, /* Script */8);
}

exports._removeComponent = _removeComponent;
exports.removeDirectionLightComponent = removeDirectionLightComponent;
exports.removeCameraGroupComponent = removeCameraGroupComponent;
exports.removeGeometryComponent = removeGeometryComponent;
exports.removeRenderGroupComponent = removeRenderGroupComponent;
exports.removeFlyCameraControllerComponent = removeFlyCameraControllerComponent;
exports.removeArcballCameraControllerComponent = removeArcballCameraControllerComponent;
exports.removeScriptComponent = removeScriptComponent;
/* TestTool-WonderEditor Not a pure module */
