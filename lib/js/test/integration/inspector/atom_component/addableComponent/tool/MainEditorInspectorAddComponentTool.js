'use strict';

var TestTool$WonderEditor = require("../../../../../tool/TestTool.js");
var SceneTreeTool$WonderEditor = require("../../../../../tool/SceneTreeTool.js");
var GameObjectTool$WonderEditor = require("../../../../../tool/GameObjectTool.js");
var AddableComponent$WonderEditor = require("../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/atom_component/addableComponent/ui/AddableComponent.js");

function _addComponent(param, gameObject, type_) {
  return AddableComponent$WonderEditor.Method[/* addSpecificComponent */1](/* tuple */[
              param[0],
              param[1]
            ], gameObject, type_);
}

function addDirectionLightComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _addComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, "Light");
}

function addScriptComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _addComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, "Script");
}

function addCameraGroupComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _addComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, "CameraGroup");
}

function addGeometryComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _addComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, "Geometry");
}

function addRenderGroupComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _addComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, "RenderGroup");
}

function addFlyCameraControllerComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _addComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, "FlyCameraController");
}

function addArcballCameraControllerComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _addComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, "ArcballCameraController");
}

function buildTwoAddedFlyCameraControllerCamera(sandbox) {
  var match = SceneTreeTool$WonderEditor.buildTwoCameraSceneGraphToEngine(sandbox);
  var camera2 = match[1];
  var camera1 = match[0];
  GameObjectTool$WonderEditor.setCurrentSceneTreeNode(camera1);
  addFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
  GameObjectTool$WonderEditor.setCurrentSceneTreeNode(camera2);
  addFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
  return /* tuple */[
          camera1,
          camera2
        ];
}

function buildTwoAddedArcballCameraControllerCamera(sandbox) {
  var match = SceneTreeTool$WonderEditor.buildTwoCameraSceneGraphToEngine(sandbox);
  var camera2 = match[1];
  var camera1 = match[0];
  GameObjectTool$WonderEditor.setCurrentSceneTreeNode(camera1);
  addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
  GameObjectTool$WonderEditor.setCurrentSceneTreeNode(camera2);
  addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
  return /* tuple */[
          camera1,
          camera2
        ];
}

exports._addComponent = _addComponent;
exports.addDirectionLightComponent = addDirectionLightComponent;
exports.addScriptComponent = addScriptComponent;
exports.addCameraGroupComponent = addCameraGroupComponent;
exports.addGeometryComponent = addGeometryComponent;
exports.addRenderGroupComponent = addRenderGroupComponent;
exports.addFlyCameraControllerComponent = addFlyCameraControllerComponent;
exports.addArcballCameraControllerComponent = addArcballCameraControllerComponent;
exports.buildTwoAddedFlyCameraControllerCamera = buildTwoAddedFlyCameraControllerCamera;
exports.buildTwoAddedArcballCameraControllerCamera = buildTwoAddedArcballCameraControllerCamera;
/* TestTool-WonderEditor Not a pure module */
