'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var MainEditorLeftHeader$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/left_components/atom_component/header/MainEditorLeftHeader.js");

function addCube($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* addGameObjectByType */0], /* tuple */[
              uiState,
              dispatchFunc
            ], /* Cube */0, /* () */0);
}

function addSphere($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* addGameObjectByType */0], /* tuple */[
              uiState,
              dispatchFunc
            ], /* Sphere */1, /* () */0);
}

function addEmptyGameObject($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* addGameObjectByType */0], /* tuple */[
              uiState,
              dispatchFunc
            ], /* EmptyGameObject */2, /* () */0);
}

function disposeCurrentSceneTreeNode($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* disposeCurrentSceneTreeNode */1], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function cloneCurrentSceneTreeNode($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* cloneCurrentSceneTreeNode */2], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

exports.addCube = addCube;
exports.addSphere = addSphere;
exports.addEmptyGameObject = addEmptyGameObject;
exports.disposeCurrentSceneTreeNode = disposeCurrentSceneTreeNode;
exports.cloneCurrentSceneTreeNode = cloneCurrentSceneTreeNode;
/* TestTool-WonderEditor Not a pure module */
