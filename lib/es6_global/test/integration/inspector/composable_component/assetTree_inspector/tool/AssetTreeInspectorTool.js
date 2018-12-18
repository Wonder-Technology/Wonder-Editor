

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as AssetTreeInspector$WonderEditor from "../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/ui/AssetTreeInspector.js";

function _renameAssetNode(param, param$1, name) {
  return Curry._3(AssetTreeInspector$WonderEditor.Method[/* renameAssetTreeNode */1], /* tuple */[
              param[0],
              param[1]
            ], /* tuple */[
              param$1[0],
              param$1[1]
            ], name);
}

function renameAssetTextureNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return _renameAssetNode(/* tuple */[
              store,
              dispatchFunc
            ], /* tuple */[
              nodeId,
              /* Texture */1
            ], name);
}

function renameAssetMaterialNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return _renameAssetNode(/* tuple */[
              store,
              dispatchFunc
            ], /* tuple */[
              nodeId,
              /* Material */3
            ], name);
}

function renameAssetFolderNode($staropt$star, $staropt$star$1, nodeId, name, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return _renameAssetNode(/* tuple */[
              store,
              dispatchFunc
            ], /* tuple */[
              nodeId,
              /* Folder */0
            ], name);
}

function isFolderNameDisabled(nodeId) {
  return AssetTreeInspector$WonderEditor.Method[/* _isFolderNameDisabled */2](nodeId);
}

var Rename = /* module */[
  /* _renameAssetNode */_renameAssetNode,
  /* renameAssetTextureNode */renameAssetTextureNode,
  /* renameAssetMaterialNode */renameAssetMaterialNode,
  /* renameAssetFolderNode */renameAssetFolderNode,
  /* isFolderNameDisabled */isFolderNameDisabled
];

function reducer($staropt$star, $staropt$star$1, nodeId, nodeType, action, state, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return AssetTreeInspector$WonderEditor.reducer(/* tuple */[
                store,
                dispatchFunc
              ], nodeId, nodeType, action)(state);
}

export {
  Rename ,
  reducer ,
  
}
/* TestTool-WonderEditor Not a pure module */
