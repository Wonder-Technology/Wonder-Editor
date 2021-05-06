'use strict';

var Js_option = require("bs-platform/lib/js/js_option.js");
var NodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/NodeAssetService.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var TreeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/TreeAssetEditorService.js");
var IterateTreeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/IterateTreeAssetService.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var NodeNameAssetLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");

function getMaterialComponent(nodeId, $staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState))[/* materialComponent */1];
}

function getMaterialName(nodeId, $staropt$star, $staropt$star$1, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$1 !== undefined ? $staropt$star$1 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
  return NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(match[/* materialComponent */1], match[/* type_ */0], engineState);
}

function getMaterialType(nodeId, $staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState))[/* type_ */0];
}

function _findNodeByMaterialComponentAndType(material, materialType, editorState) {
  return IterateTreeAssetService$WonderEditor.findOne(TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), undefined, undefined, (function (node) {
                var match = MaterialNodeAssetService$WonderEditor.getNodeData(node);
                if (match[/* materialComponent */1] === material) {
                  return materialType === match[/* type_ */0];
                } else {
                  return false;
                }
              }), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function hasMaterialComponent(material, materialType, editorState) {
  return Js_option.isSome(_findNodeByMaterialComponentAndType(material, materialType, editorState));
}

function findNodeIdByMaterialComponentAndType(material, materialType, editorState) {
  return Js_option.map(NodeAssetService$WonderEditor.getNodeId, _findNodeByMaterialComponentAndType(material, materialType, editorState));
}

exports.getMaterialComponent = getMaterialComponent;
exports.getMaterialName = getMaterialName;
exports.getMaterialType = getMaterialType;
exports._findNodeByMaterialComponentAndType = _findNodeByMaterialComponentAndType;
exports.hasMaterialComponent = hasMaterialComponent;
exports.findNodeIdByMaterialComponentAndType = findNodeIdByMaterialComponentAndType;
/* StateEditorService-WonderEditor Not a pure module */
