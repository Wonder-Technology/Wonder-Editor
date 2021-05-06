'use strict';

var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var OperateScaleGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js");
var OperateTranslationGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js");
var CoordinateSystemTransformGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/CoordinateSystemTransformGizmoSceneViewEditorService.js");

function getArrowFromAxisGameObject(axisGameObject, engineState) {
  return GameObjectTool$WonderEditor.getChild(axisGameObject, 0, engineState);
}

function getArrowGameObject(editorState, engineState) {
  var xAxisGameObject = StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo);
  return getArrowFromAxisGameObject(xAxisGameObject, engineState);
}

function getLineFromAxisGameObject(axisGameObject, engineState) {
  return GameObjectTool$WonderEditor.getChild(axisGameObject, 1, engineState);
}

function getLineGameObject(editorState, engineState) {
  var xAxisGameObject = StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo);
  return getLineFromAxisGameObject(xAxisGameObject, engineState);
}

function getCubeFromAxisGameObject(axisGameObject, engineState) {
  return GameObjectTool$WonderEditor.getChild(axisGameObject, 0, engineState);
}

function getCubeGameObject(editorState, engineState) {
  var xAxisGameObject = StateLogicService$WonderEditor.getEditorState(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo);
  return getCubeFromAxisGameObject(xAxisGameObject, engineState);
}

function setCoordinateSystem(coordinateSystem) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return CoordinateSystemTransformGizmoSceneViewEditorService$WonderEditor.setCoordinateSystem(coordinateSystem, param);
        }));
  return StateLogicService$WonderEditor.getAndRefreshEngineState(/* () */0);
}

exports.getArrowFromAxisGameObject = getArrowFromAxisGameObject;
exports.getArrowGameObject = getArrowGameObject;
exports.getLineFromAxisGameObject = getLineFromAxisGameObject;
exports.getLineGameObject = getLineGameObject;
exports.getCubeFromAxisGameObject = getCubeFromAxisGameObject;
exports.getCubeGameObject = getCubeGameObject;
exports.setCoordinateSystem = setCoordinateSystem;
/* GameObjectTool-WonderEditor Not a pure module */
