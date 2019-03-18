

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as MainEditorAssetHeader$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/header/ui/MainEditorAssetHeader.js";
import * as MainEditorAssetNodeTool$WonderEditor from "./MainEditorAssetNodeTool.js";

function removeNode($staropt$star, $staropt$star$1, nodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  MainEditorAssetNodeTool$WonderEditor.setCurrentNodeId(nodeId);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* removeAssetNode */1], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function removeTextureNode($staropt$star, $staropt$star$1, textureNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, uiState, textureNodeId, /* () */0);
}

function removeMaterialNode($staropt$star, $staropt$star$1, materialNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, uiState, materialNodeId, /* () */0);
}

function removeFolderNode($staropt$star, $staropt$star$1, folderNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, uiState, folderNodeId, /* () */0);
}

function removeWDBNode($staropt$star, $staropt$star$1, wdbNodeId, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, uiState, wdbNodeId, /* () */0);
}

function addFolder($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addFolder */0], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function addMaterial($staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addMaterial */3], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* () */0);
}

export {
  removeNode ,
  removeTextureNode ,
  removeMaterialNode ,
  removeFolderNode ,
  removeWDBNode ,
  addFolder ,
  addMaterial ,
  
}
/* TestTool-WonderEditor Not a pure module */
