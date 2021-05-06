'use strict';

var GameObjectAPI$Wonderjs = require("wonder.js/lib/js/src/api/GameObjectAPI.js");
var OptionService$Wonderjs = require("wonder.js/lib/js/src/service/atom/OptionService.js");
var SceneViewEditorService$WonderEditor = require("../../src/service/state/editor/view/sceneView/SceneViewEditorService.js");
var BasicCameraViewEngineService$WonderEditor = require("../../src/service/state/engine/camera/BasicCameraViewEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

function getCurrentCameraGameObject(engineState) {
  var match = BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(engineState);
  if (match !== undefined) {
    return BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(match, engineState);
  }
  
}

function getCurrentCameraProjection(engineState) {
  return GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent(OptionService$Wonderjs.unsafeGet(getCurrentCameraGameObject(engineState)), engineState);
}

function getEditCameraArcballCameraController(editorState, engineState) {
  var __x = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  return GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(__x, engineState);
}

function getEditCameraBasicCameraView(editorState, engineState) {
  var __x = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(__x, engineState);
}

exports.getCurrentCameraGameObject = getCurrentCameraGameObject;
exports.getCurrentCameraProjection = getCurrentCameraProjection;
exports.getEditCameraArcballCameraController = getEditCameraArcballCameraController;
exports.getEditCameraBasicCameraView = getEditCameraBasicCameraView;
/* GameObjectAPI-Wonderjs Not a pure module */
