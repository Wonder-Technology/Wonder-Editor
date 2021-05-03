

import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as MainEditorArcballCameraController$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/camera/atom_component/arcball_camera/ui/MainEditorArcballCameraController.js";

function changeDistance(cameraController, value) {
  return MainEditorArcballCameraController$WonderEditor.Method[/* changeDistance */3](cameraController, value);
}

function blurArcballCameraDistance(cameraController, value, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorArcballCameraController$WonderEditor.Method[/* blurArcballCameraDistance */1](/* tuple */[
              store,
              dispatchFunc
            ], cameraController, value);
}

function changeDistanceAndBlur(cameraController, value, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  MainEditorArcballCameraController$WonderEditor.Method[/* changeDistance */3](cameraController, value);
  return blurArcballCameraDistance(cameraController, value, store, dispatchFunc, /* () */0);
}

function changeMinDistance(cameraController, value) {
  return MainEditorArcballCameraController$WonderEditor.Method[/* changeMinDistance */4](cameraController, value);
}

function blurArcballCameraMinDistance(cameraController, value, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return MainEditorArcballCameraController$WonderEditor.Method[/* blurArcballCameraMinDistance */2](/* tuple */[
              store,
              dispatchFunc
            ], cameraController, value);
}

function changeMinDistanceAndBlur(cameraController, value, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  MainEditorArcballCameraController$WonderEditor.Method[/* changeMinDistance */4](cameraController, value);
  return blurArcballCameraMinDistance(cameraController, value, store, dispatchFunc, /* () */0);
}

export {
  changeDistance ,
  blurArcballCameraDistance ,
  changeDistanceAndBlur ,
  changeMinDistance ,
  blurArcballCameraMinDistance ,
  changeMinDistanceAndBlur ,
  
}
/* TestTool-WonderEditor Not a pure module */
