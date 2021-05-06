'use strict';

var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var FlyCameraEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/FlyCameraEngineService.js");
var MainEditorFlyCameraController$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/camera/atom_component/fly_camera/ui/MainEditorFlyCameraController.js");

function changeMoveSpeed(cameraController, value) {
  return MainEditorFlyCameraController$WonderEditor.Method[/* changeMoveSpeed */1](cameraController, value);
}

function blurFlyCameraMoveSpeed(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorFlyCameraController$WonderEditor.Method[/* blurFlyCameraMoveSpeed */2](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraController, value);
}

function changeMoveSpeedAndBlur(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldValue = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return FlyCameraEngineService$WonderEditor.unsafeGetFlyCameraControllerMoveSpeed(cameraController, param);
        }));
  MainEditorFlyCameraController$WonderEditor.Method[/* changeMoveSpeed */1](cameraController, value);
  return blurFlyCameraMoveSpeed(cameraController, oldValue, uiState, dispatchFunc, /* () */0);
}

function changeRotateSpeed(cameraController, value) {
  return MainEditorFlyCameraController$WonderEditor.Method[/* changeRotateSpeed */3](cameraController, value);
}

function blurFlyCameraRotateSpeed(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorFlyCameraController$WonderEditor.Method[/* blurFlyCameraRotateSpeed */4](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraController, value);
}

function changeRotateSpeedAndBlur(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldValue = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return FlyCameraEngineService$WonderEditor.unsafeGetFlyCameraControllerRotateSpeed(cameraController, param);
        }));
  MainEditorFlyCameraController$WonderEditor.Method[/* changeRotateSpeed */3](cameraController, value);
  return blurFlyCameraRotateSpeed(cameraController, oldValue, uiState, dispatchFunc, /* () */0);
}

function changeWheelSpeed(cameraController, value) {
  return MainEditorFlyCameraController$WonderEditor.Method[/* changeWheelSpeed */5](cameraController, value);
}

function blurFlyCameraWheelSpeed(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorFlyCameraController$WonderEditor.Method[/* blurFlyCameraWheelSpeed */6](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraController, value);
}

function changeWheelSpeedAndBlur(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldValue = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return FlyCameraEngineService$WonderEditor.unsafeGetFlyCameraControllerWheelSpeed(cameraController, param);
        }));
  MainEditorFlyCameraController$WonderEditor.Method[/* changeWheelSpeed */5](cameraController, value);
  return blurFlyCameraWheelSpeed(cameraController, oldValue, uiState, dispatchFunc, /* () */0);
}

exports.changeMoveSpeed = changeMoveSpeed;
exports.blurFlyCameraMoveSpeed = blurFlyCameraMoveSpeed;
exports.changeMoveSpeedAndBlur = changeMoveSpeedAndBlur;
exports.changeRotateSpeed = changeRotateSpeed;
exports.blurFlyCameraRotateSpeed = blurFlyCameraRotateSpeed;
exports.changeRotateSpeedAndBlur = changeRotateSpeedAndBlur;
exports.changeWheelSpeed = changeWheelSpeed;
exports.blurFlyCameraWheelSpeed = blurFlyCameraWheelSpeed;
exports.changeWheelSpeedAndBlur = changeWheelSpeedAndBlur;
/* TestTool-WonderEditor Not a pure module */
