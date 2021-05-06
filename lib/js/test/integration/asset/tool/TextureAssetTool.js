'use strict';

var TextureNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/TextureNodeAssetService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");

function getTextureContentIndex(nodeId, editorState) {
  return TextureNodeAssetService$WonderEditor.getTextureContentIndex(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
}

exports.getTextureContentIndex = getTextureContentIndex;
/* TextureNodeAssetService-WonderEditor Not a pure module */
