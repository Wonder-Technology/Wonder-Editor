'use strict';

var FolderNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/FolderNodeAssetService.js");
var NodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/NodeAssetEditorService.js");
var NodeNameAssetLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");

function getNoNameFolderName(param) {
  return "NoName Folder";
}

function _setNodeData(nodeId, nodeData, editorState) {
  var arg = FolderNodeAssetService$WonderEditor.getChildren(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
  return NodeAssetEditorService$WonderEditor.setNodeData(nodeId, nodeData, (function (param) {
                return (function (param$1) {
                    var param$2 = param$1;
                    var param$3 = arg;
                    return FolderNodeAssetService$WonderEditor.buildNodeByNodeData(param, param$2, param$3);
                  });
              }), editorState);
}

function getFolderName(nodeId, editorState) {
  return NodeNameAssetLogicService$WonderEditor.getFolderNodeName(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
}

function setFolderName(nodeId, name, editorState) {
  return _setNodeData(nodeId, FolderNodeAssetService$WonderEditor.rename(name, FolderNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState))), editorState);
}

function getIsShowChildren(nodeId, editorState) {
  return FolderNodeAssetService$WonderEditor.getIsShowChildren(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
}

var findChild = FolderNodeAssetService$WonderEditor.findChild;

exports.getNoNameFolderName = getNoNameFolderName;
exports.findChild = findChild;
exports._setNodeData = _setNodeData;
exports.getFolderName = getFolderName;
exports.setFolderName = setFolderName;
exports.getIsShowChildren = getIsShowChildren;
/* FolderNodeAssetService-WonderEditor Not a pure module */
