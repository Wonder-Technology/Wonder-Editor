'use strict';

var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var FileNameService$WonderEditor = require("../../../../src/service/atom/FileNameService.js");
var NodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/NodeAssetService.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var TextureNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/TextureNodeAssetService.js");
var OperateTextureLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/OperateTextureLogicService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var BasicSourceTypeTextureNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/textureNode/BasicSourceTypeTextureNodeAssetEditorService.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

function getTextureComponent(nodeId, editorState) {
  return TextureNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState))[/* textureComponent */2];
}

function getTextureImageDataIndex(nodeId, editorState) {
  return TextureNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState))[/* imageDataIndex */3];
}

function getTextureName(nodeId, $staropt$star, $staropt$star$1, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$1 !== undefined ? $staropt$star$1 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return OperateTextureLogicService$WonderEditor.getName(getTextureComponent(nodeId, editorState), engineState);
}

function setTextureImageName(nodeId, name, editorState) {
  var textureComponent = getTextureComponent(nodeId, editorState);
  var init = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(textureComponent, editorState);
  return BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.setData(textureComponent, /* record */[
              /* base64 */init[/* base64 */0],
              /* uint8Array */init[/* uint8Array */1],
              /* blobObjectURL */init[/* blobObjectURL */2],
              /* name */name,
              /* mimeType */init[/* mimeType */4]
            ], editorState);
}

function hasTextureComponentOfBasicSourceTypeNode(texture, editorState) {
  return BasicSourceTypeTextureNodeAssetEditorService$WonderEditor.findTextureComponentsOfBasicSourceTypeTextureNode(editorState).includes(texture);
}

function findBasicSourceTypeTextureNodeIdByTextureComponent(texture, editorState) {
  return Js_option.map(NodeAssetService$WonderEditor.getNodeId, Caml_option.undefined_to_opt(BasicSourceTypeTextureNodeAssetEditorService$WonderEditor.findAllBasicSourceTypeTextureNodes(editorState).find((function (node) {
                        var match = TextureNodeAssetService$WonderEditor.getNodeData(node);
                        return match[/* textureComponent */2] === texture;
                      }))));
}

var buildTextureAssetName = FileNameService$WonderEditor.getBaseName;

exports.getTextureComponent = getTextureComponent;
exports.getTextureImageDataIndex = getTextureImageDataIndex;
exports.getTextureName = getTextureName;
exports.setTextureImageName = setTextureImageName;
exports.hasTextureComponentOfBasicSourceTypeNode = hasTextureComponentOfBasicSourceTypeNode;
exports.findBasicSourceTypeTextureNodeIdByTextureComponent = findBasicSourceTypeTextureNodeIdByTextureComponent;
exports.buildTextureAssetName = buildTextureAssetName;
/* StateEditorService-WonderEditor Not a pure module */
