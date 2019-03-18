

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as ComponentBox$WonderEditor from "../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/atom_component/componentBox/ui/ComponentBox.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";

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
            ], gameObject, /* Light */5);
}

function removeCameraGroupComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _removeComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, /* CameraGroup */4);
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

function removeArcballCameraControllerComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _removeComponent(/* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, /* ArcballCameraController */3);
}

export {
  _removeComponent ,
  removeDirectionLightComponent ,
  removeCameraGroupComponent ,
  removeGeometryComponent ,
  removeRenderGroupComponent ,
  removeArcballCameraControllerComponent ,
  
}
/* TestTool-WonderEditor Not a pure module */
