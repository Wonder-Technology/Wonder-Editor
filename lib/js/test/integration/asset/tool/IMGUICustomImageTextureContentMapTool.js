'use strict';

var Js_option = require("bs-platform/lib/js/js_option.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var IMGUICustomImageTextureContentMapAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/textureContentMap/IMGUICustomImageTextureContentMapAssetEditorService.js");

function hasContent(textureContentIndex, $staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return Js_option.isSome(IMGUICustomImageTextureContentMapAssetEditorService$WonderEditor.getContent(textureContentIndex, editorState));
}

exports.hasContent = hasContent;
/* StateEditorService-WonderEditor Not a pure module */
