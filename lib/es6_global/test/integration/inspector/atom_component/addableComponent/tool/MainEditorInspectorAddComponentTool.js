

import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as SceneTreeTool$WonderEditor from "../../../../../tool/SceneTreeTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as AddableComponent$WonderEditor from "../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/atom_component/addableComponent/ui/AddableComponent.js";

function _addComponent(param, gameObject, type_) {
  return AddableComponent$WonderEditor.Method[/* addSpecificComponent */0](/* tuple */[
              param[0],
              param[1]
            ], gameObject, type_);
}

function addDirectionLightComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _addComponent(/* tuple */[
              store,
              dispatchFunc
            ], gameObject, "Light");
}

function addCameraGroupComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _addComponent(/* tuple */[
              store,
              dispatchFunc
            ], gameObject, "CameraGroup");
}

function addGeometryComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _addComponent(/* tuple */[
              store,
              dispatchFunc
            ], gameObject, "Geometry");
}

function addRenderGroupComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _addComponent(/* tuple */[
              store,
              dispatchFunc
            ], gameObject, "RenderGroup");
}

function addArcballCameraControllerComponent($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var gameObject = $staropt$star$2 !== undefined ? $staropt$star$2 : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  return _addComponent(/* tuple */[
              store,
              dispatchFunc
            ], gameObject, "ArcballCameraController");
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

export {
  _addComponent ,
  addDirectionLightComponent ,
  addCameraGroupComponent ,
  addGeometryComponent ,
  addRenderGroupComponent ,
  addArcballCameraControllerComponent ,
  buildTwoAddedArcballCameraControllerCamera ,
  
}
/* TestTool-WonderEditor Not a pure module */
