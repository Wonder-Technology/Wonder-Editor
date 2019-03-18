

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as NodeAssetService$WonderEditor from "../../../../../../src/service/record/editor/asset/NodeAssetService.js";
import * as AssetTreeInspector$WonderEditor from "../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/ui/AssetTreeInspector.js";
import * as StateEditorService$WonderEditor from "../../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetTreeTool.js";

function _renameAssetNode(param, nodeId, name) {
  return Curry._3(AssetTreeInspector$WonderEditor.Method[/* renameAssetTreeNode */1], /* tuple */[
              param[0],
              param[1]
            ], nodeId, name);
}

function renameAssetTextureNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return _renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetMaterialNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return _renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetWDBNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return _renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function renameAssetFolderNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return _renameAssetNode(/* tuple */[
              uiState,
              dispatchFunc
            ], nodeId, name);
}

function isFolderNameDisabled(nodeId) {
  return NodeAssetService$WonderEditor.isIdEqual(MainEditorAssetTreeTool$WonderEditor.getRootNodeId(StateEditorService$WonderEditor.getState(/* () */0)), nodeId);
}

var Rename = /* module */[
  /* _renameAssetNode */_renameAssetNode,
  /* renameAssetTextureNode */renameAssetTextureNode,
  /* renameAssetMaterialNode */renameAssetMaterialNode,
  /* renameAssetWDBNode */renameAssetWDBNode,
  /* renameAssetFolderNode */renameAssetFolderNode,
  /* isFolderNameDisabled */isFolderNameDisabled
];

function reducer($staropt$star, $staropt$star$1, nodeId, action, state, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return AssetTreeInspector$WonderEditor.reducer(/* tuple */[
                uiState,
                dispatchFunc
              ], nodeId, action)(state);
}

export {
  Rename ,
  reducer ,
  
}
/* TestTool-WonderEditor Not a pure module */
