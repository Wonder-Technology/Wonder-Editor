'use strict';

var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var IndexAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/IndexAssetEditorService.js");
var TextureNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/TextureNodeAssetService.js");
var ImmutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableSparseMapService.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

function getDataByTextureNode(textureNode, editorState) {
  var match = TextureNodeAssetService$WonderEditor.getNodeData(textureNode);
  return BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* imageDataIndex */3], editorState);
}

function getMapValidLength(editorState) {
  return ImmutableSparseMapService$WonderCommonlib.getValidValues(BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.getMap(editorState)).length;
}

function getNewImageDataMapIndex($staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return IndexAssetEditorService$WonderEditor.getBasicSourceTextureImageDataMapIndex(editorState) + 1 | 0;
}

exports.getDataByTextureNode = getDataByTextureNode;
exports.getMapValidLength = getMapValidLength;
exports.getNewImageDataMapIndex = getNewImageDataMapIndex;
/* StateEditorService-WonderEditor Not a pure module */
