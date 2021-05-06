'use strict';

var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var JudgeTool$WonderEditor = require("../../../../../../tool/JudgeTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var TransformUtils$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js");
var Vector3Service$WonderEditor = require("../../../../../../../src/service/primitive/Vector3Service.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var MainEditorTransform$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/ui/MainEditorTransform.js");
var TransformEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/transform/TransformEditorService.js");

function changePositionX(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changePositionX */4](transform, value);
}

function changePositionXAndBlur(value, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var transform = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldPosition = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformUtils$WonderEditor.getTransformPositionData(transform, param);
        }));
  MainEditorTransform$WonderEditor.Method[/* changePositionX */4](transform, value);
  return MainEditorTransform$WonderEditor.Method[/* blurPositionEvent */0](/* tuple */[
              uiState,
              dispatchFunc
            ], transform, oldPosition);
}

function changePositionY(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changePositionY */5](transform, value);
}

function changePositionYAndBlur(value, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var transform = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldPosition = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformUtils$WonderEditor.getTransformPositionData(transform, param);
        }));
  MainEditorTransform$WonderEditor.Method[/* changePositionY */5](transform, value);
  return MainEditorTransform$WonderEditor.Method[/* blurPositionEvent */0](/* tuple */[
              uiState,
              dispatchFunc
            ], transform, oldPosition);
}

function changePositionZ(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changePositionZ */6](transform, value);
}

function changeRotationX(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changeRotationX */13](transform, value);
}

function changeRotationY(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changeRotationY */14](transform, value);
}

function changeRotationZ(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changeRotationZ */15](transform, value);
}

function changeRotationYAndBlur(value, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var transform = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldRotation = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformUtils$WonderEditor.getTransformRotationData(transform, param);
        }));
  MainEditorTransform$WonderEditor.Method[/* changeRotationY */14](transform, value);
  return MainEditorTransform$WonderEditor.Method[/* blurRotationEvent */1](/* tuple */[
              uiState,
              dispatchFunc
            ], transform, oldRotation);
}

function changeScaleX(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changeScaleX */8](transform, value);
}

function changeScaleY(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changeScaleY */9](transform, value);
}

function changeScaleZ(transform, value) {
  return MainEditorTransform$WonderEditor.Method[/* changeScaleZ */10](transform, value);
}

function setLocalEulerAngleData(param) {
  StateEditorService$WonderEditor.setState(TransformEditorService$WonderEditor.setLocalEulerAngleZ(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0), 10, TransformEditorService$WonderEditor.setLocalEulerAngleY(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0), 10, TransformEditorService$WonderEditor.setLocalEulerAngleX(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0), 10, StateEditorService$WonderEditor.getState(/* () */0)))));
  return /* () */0;
}

function judgeShouldRemoveLocalEulerAngleData(param) {
  var partial_arg = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
  var localEulerAngle = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return TransformUtils$WonderEditor.getTransformRotationData(partial_arg, param);
        }));
  return JudgeTool$WonderEditor.isEqual(Vector3Service$WonderEditor.truncate(3, localEulerAngle), /* tuple */[
              0,
              0,
              0
            ]);
}

exports.changePositionX = changePositionX;
exports.changePositionXAndBlur = changePositionXAndBlur;
exports.changePositionY = changePositionY;
exports.changePositionYAndBlur = changePositionYAndBlur;
exports.changePositionZ = changePositionZ;
exports.changeRotationX = changeRotationX;
exports.changeRotationY = changeRotationY;
exports.changeRotationZ = changeRotationZ;
exports.changeRotationYAndBlur = changeRotationYAndBlur;
exports.changeScaleX = changeScaleX;
exports.changeScaleY = changeScaleY;
exports.changeScaleZ = changeScaleZ;
exports.setLocalEulerAngleData = setLocalEulerAngleData;
exports.judgeShouldRemoveLocalEulerAngleData = judgeShouldRemoveLocalEulerAngleData;
/* TestTool-WonderEditor Not a pure module */
