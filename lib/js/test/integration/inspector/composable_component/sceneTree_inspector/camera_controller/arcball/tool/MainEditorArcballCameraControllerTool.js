'use strict';

var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/ArcballCameraEngineService.js");
var MainEditorArcballCameraController$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/camera/atom_component/arcball_camera/ui/MainEditorArcballCameraController.js");

function changeDistance(cameraController, value) {
  return MainEditorArcballCameraController$WonderEditor.Method[/* changeDistance */8](cameraController, value);
}

function blurArcballCameraDistance(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorArcballCameraController$WonderEditor.Method[/* blurArcballCameraDistance */2](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraController, value);
}

function changeDistanceAndBlur(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldValue = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(cameraController, param);
        }));
  MainEditorArcballCameraController$WonderEditor.Method[/* changeDistance */8](cameraController, value);
  return blurArcballCameraDistance(cameraController, oldValue, uiState, dispatchFunc, /* () */0);
}

function dragDropArcballCameraDistance(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorArcballCameraController$WonderEditor.Method[/* dragDropArcballCameraDistance */7](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraController, value);
}

function changeDistanceAndDragDrop(cameraController, changeValue, dragDropValue, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  MainEditorArcballCameraController$WonderEditor.Method[/* changeDistance */8](cameraController, changeValue);
  return dragDropArcballCameraDistance(cameraController, dragDropValue, uiState, dispatchFunc, /* () */0);
}

function changeMinDistance(cameraController, value) {
  return MainEditorArcballCameraController$WonderEditor.Method[/* changeMinDistance */9](cameraController, value);
}

function blurArcballCameraMinDistance(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorArcballCameraController$WonderEditor.Method[/* blurArcballCameraMinDistance */3](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraController, value);
}

function changeMinDistanceAndBlur(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldValue = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMinDistance(cameraController, param);
        }));
  MainEditorArcballCameraController$WonderEditor.Method[/* changeMinDistance */9](cameraController, value);
  return blurArcballCameraMinDistance(cameraController, oldValue, uiState, dispatchFunc, /* () */0);
}

function changePhi(cameraController, value) {
  return MainEditorArcballCameraController$WonderEditor.Method[/* changePhi */10](cameraController, value);
}

function blurArcballCameraPhi(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorArcballCameraController$WonderEditor.Method[/* blurArcballCameraPhi */4](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraController, value);
}

function changePhiAndBlur(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldValue = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerPhi(cameraController, param);
        }));
  MainEditorArcballCameraController$WonderEditor.Method[/* changePhi */10](cameraController, value);
  return blurArcballCameraPhi(cameraController, oldValue, uiState, dispatchFunc, /* () */0);
}

function changeTheta(cameraController, value) {
  return MainEditorArcballCameraController$WonderEditor.Method[/* changeTheta */11](cameraController, value);
}

function blurArcballCameraTheta(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorArcballCameraController$WonderEditor.Method[/* blurArcballCameraTheta */5](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraController, value);
}

function changeThetaAndBlur(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldValue = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTheta(cameraController, param);
        }));
  MainEditorArcballCameraController$WonderEditor.Method[/* changeTheta */11](cameraController, value);
  return blurArcballCameraTheta(cameraController, oldValue, uiState, dispatchFunc, /* () */0);
}

function changeTargetX(cameraController, value) {
  return MainEditorArcballCameraController$WonderEditor.Method[/* changeTargetX */13](cameraController, value);
}

function changeTargetY(cameraController, value) {
  return MainEditorArcballCameraController$WonderEditor.Method[/* changeTargetY */14](cameraController, value);
}

function changeTargetZ(cameraController, value) {
  return MainEditorArcballCameraController$WonderEditor.Method[/* changeTargetZ */15](cameraController, value);
}

function blurArcballCameraTarget(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorArcballCameraController$WonderEditor.Method[/* blurArcballCameraTarget */6](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraController, value);
}

function changeTargetXAndBlur(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldTarget = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget(cameraController, param);
        }));
  MainEditorArcballCameraController$WonderEditor.Method[/* changeTargetX */13](cameraController, value);
  return blurArcballCameraTarget(cameraController, oldTarget, uiState, dispatchFunc, /* () */0);
}

function changeTargetYAndBlur(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldTarget = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget(cameraController, param);
        }));
  MainEditorArcballCameraController$WonderEditor.Method[/* changeTargetY */14](cameraController, value);
  return blurArcballCameraTarget(cameraController, oldTarget, uiState, dispatchFunc, /* () */0);
}

function changeTargetZAndBlur(cameraController, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var oldTarget = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget(cameraController, param);
        }));
  MainEditorArcballCameraController$WonderEditor.Method[/* changeTargetZ */15](cameraController, value);
  return blurArcballCameraTarget(cameraController, oldTarget, uiState, dispatchFunc, /* () */0);
}

exports.changeDistance = changeDistance;
exports.blurArcballCameraDistance = blurArcballCameraDistance;
exports.changeDistanceAndBlur = changeDistanceAndBlur;
exports.dragDropArcballCameraDistance = dragDropArcballCameraDistance;
exports.changeDistanceAndDragDrop = changeDistanceAndDragDrop;
exports.changeMinDistance = changeMinDistance;
exports.blurArcballCameraMinDistance = blurArcballCameraMinDistance;
exports.changeMinDistanceAndBlur = changeMinDistanceAndBlur;
exports.changePhi = changePhi;
exports.blurArcballCameraPhi = blurArcballCameraPhi;
exports.changePhiAndBlur = changePhiAndBlur;
exports.changeTheta = changeTheta;
exports.blurArcballCameraTheta = blurArcballCameraTheta;
exports.changeThetaAndBlur = changeThetaAndBlur;
exports.changeTargetX = changeTargetX;
exports.changeTargetY = changeTargetY;
exports.changeTargetZ = changeTargetZ;
exports.blurArcballCameraTarget = blurArcballCameraTarget;
exports.changeTargetXAndBlur = changeTargetXAndBlur;
exports.changeTargetYAndBlur = changeTargetYAndBlur;
exports.changeTargetZAndBlur = changeTargetZAndBlur;
/* TestTool-WonderEditor Not a pure module */
