'use strict';

var OptionService$WonderEditor = require("../../../../src/service/primitive/OptionService.js");
var MainEditorAssetTreeTool$WonderEditor = require("./MainEditorAssetTreeTool.js");
var AssetBundleNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/AssetBundleNodeAssetService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");

function getName(nodeId, editorState) {
  return AssetBundleNodeAssetService$WonderEditor.getNodeNameByData(AssetBundleNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState)));
}

function getAssetBundle(nodeId, editorState) {
  return AssetBundleNodeAssetService$WonderEditor.getAssetBundle(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
}

function getAssetBundleNodeByName(name, param) {
  return OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeByName(name, /* tuple */[
                  param[0],
                  param[1]
                ]));
}

exports.getName = getName;
exports.getAssetBundle = getAssetBundle;
exports.getAssetBundleNodeByName = getAssetBundleNodeByName;
/* OptionService-WonderEditor Not a pure module */
