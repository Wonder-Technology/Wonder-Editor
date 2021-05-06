'use strict';

var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var OptionService$WonderEditor = require("../../../../src/service/primitive/OptionService.js");
var NodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/NodeAssetService.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var WDBNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/WDBNodeAssetService.js");
var MainEditorAssetTreeTool$WonderEditor = require("./MainEditorAssetTreeTool.js");
var GeometryAssetLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/asset/GeometryAssetLogicService.js");
var NodeNameAssetLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js");
var WDBNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/WDBNodeAssetEditorService.js");
var RootTreeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/RootTreeAssetEditorService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

function getWDBGameObject(nodeId, editorState) {
  return WDBNodeAssetService$WonderEditor.getWDBGameObject(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
}

var getAllWDBGameObjects = GeometryAssetLogicService$WonderEditor.getAllWDBGameObjects;

function addWDBNodeToRoot(gameObject, nodeId, editorState, $staropt$star, $staropt$star$1, imageDataIndex, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "";
  if ($staropt$star$1 !== undefined) {
    Caml_option.valFromOption($staropt$star$1);
  } else {
    new ArrayBuffer(0);
  }
  return WDBNodeAssetEditorService$WonderEditor.addWDBNodeToAssetTree(RootTreeAssetEditorService$WonderEditor.getRootNode(editorState), WDBNodeAssetService$WonderEditor.buildNode(nodeId, name, gameObject, imageDataIndex), editorState);
}

function getWDBName(nodeId, $staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return NodeNameAssetLogicService$WonderEditor.getWDBNodeName(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
}

function getWDBNodeIdByName(wdbGameObjectName, param) {
  return NodeAssetService$WonderEditor.getNodeId(OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeByName(wdbGameObjectName, /* tuple */[
                      param[0],
                      param[1]
                    ])));
}

function getValidTextureArray(editorState) {
  return BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.getValidValues(editorState).filter((function (param) {
                return Js_option.isSome(param[/* uint8Array */1]);
              }));
}

exports.getWDBGameObject = getWDBGameObject;
exports.getAllWDBGameObjects = getAllWDBGameObjects;
exports.addWDBNodeToRoot = addWDBNodeToRoot;
exports.getWDBName = getWDBName;
exports.getWDBNodeIdByName = getWDBNodeIdByName;
exports.getValidTextureArray = getValidTextureArray;
/* OptionService-WonderEditor Not a pure module */
