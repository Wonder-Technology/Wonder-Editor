

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as MainEditorAssetHeader$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/header/ui/MainEditorAssetHeader.js";
import * as MainEditorAssetNodeTool$WonderEditor from "./MainEditorAssetNodeTool.js";

function removeNode($staropt$star, $staropt$star$1, nodeId, nodeType, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  MainEditorAssetNodeTool$WonderEditor.setCurrentNodeData(nodeId, nodeType);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* removeAssetNode */2], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function removeTextureNode($staropt$star, $staropt$star$1, textureNodeId, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, store, textureNodeId, /* Texture */1, /* () */0);
}

function removeMaterialNode($staropt$star, $staropt$star$1, materialNodeId, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, store, materialNodeId, /* Material */3, /* () */0);
}

function removeFolderNode($staropt$star, $staropt$star$1, folderNodeId, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, store, folderNodeId, /* Folder */0, /* () */0);
}

function removeWDBNode($staropt$star, $staropt$star$1, wdbNodeId, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return removeNode(dispatchFunc, store, wdbNodeId, /* WDB */2, /* () */0);
}

function addFolder($staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addFolder */1], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, /* () */0);
}

function addMaterial($staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* addMaterial */4], /* tuple */[
              store,
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
