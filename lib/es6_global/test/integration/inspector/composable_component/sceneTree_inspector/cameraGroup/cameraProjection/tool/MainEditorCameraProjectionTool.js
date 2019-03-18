

import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as MainEditorCameraProjection$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/cameraGroup/atom_component/cameraProjection/ui/MainEditorCameraProjection.js";

function changeNear(cameraProjection, value) {
  return MainEditorCameraProjection$WonderEditor.Method[/* changeNear */1](cameraProjection, value);
}

function blurNear(cameraProjection, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorCameraProjection$WonderEditor.Method[/* blurNearEvent */0](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraProjection, value);
}

function changeNearAndBlur(cameraProjection, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  MainEditorCameraProjection$WonderEditor.Method[/* changeNear */1](cameraProjection, value);
  return blurNear(cameraProjection, value, uiState, dispatchFunc, /* () */0);
}

function changeFar(cameraProjection, value) {
  return MainEditorCameraProjection$WonderEditor.Method[/* changeFar */3](cameraProjection, value);
}

function blurFar(cameraProjection, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorCameraProjection$WonderEditor.Method[/* blurFarEvent */2](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraProjection, value);
}

function changeFarAndBlur(cameraProjection, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  MainEditorCameraProjection$WonderEditor.Method[/* changeFar */3](cameraProjection, value);
  return blurFar(cameraProjection, value, uiState, dispatchFunc, /* () */0);
}

function changeFovy(cameraProjection, value) {
  return MainEditorCameraProjection$WonderEditor.Method[/* changeFovy */5](cameraProjection, value);
}

function blurFovy(cameraProjection, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorCameraProjection$WonderEditor.Method[/* blurFovyEvent */4](/* tuple */[
              uiState,
              dispatchFunc
            ], cameraProjection, value);
}

function changeFovyAndBlur(cameraProjection, value, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  MainEditorCameraProjection$WonderEditor.Method[/* changeFovy */5](cameraProjection, value);
  return blurFovy(cameraProjection, value, uiState, dispatchFunc, /* () */0);
}

export {
  changeNear ,
  blurNear ,
  changeNearAndBlur ,
  changeFar ,
  blurFar ,
  changeFarAndBlur ,
  changeFovy ,
  blurFovy ,
  changeFovyAndBlur ,
  
}
/* TestTool-WonderEditor Not a pure module */
