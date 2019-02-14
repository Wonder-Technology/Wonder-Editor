

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as MainEditorLeftHeader$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/left_components/atom_component/header/MainEditorLeftHeader.js";

function addCube($staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* addGameObjectByType */0], /* tuple */[
              store,
              dispatchFunc
            ], /* Cude */0, /* () */0);
}

function addSphere($staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* addGameObjectByType */0], /* tuple */[
              store,
              dispatchFunc
            ], /* Sphere */1, /* () */0);
}

function addEmptyGameObject($staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* addGameObjectByType */0], /* tuple */[
              store,
              dispatchFunc
            ], /* EmptyGameObject */2, /* () */0);
}

function disposeCurrentSceneTreeNode($staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* disposeCurrentSceneTreeNode */1], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function cloneCurrentSceneTreeNode($staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* cloneCurrentSceneTreeNode */2], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, /* () */0);
}

export {
  addCube ,
  addSphere ,
  addEmptyGameObject ,
  disposeCurrentSceneTreeNode ,
  cloneCurrentSceneTreeNode ,
  
}
/* TestTool-WonderEditor Not a pure module */
