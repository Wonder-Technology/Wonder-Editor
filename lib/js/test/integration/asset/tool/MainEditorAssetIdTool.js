'use strict';

var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var IndexAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/IndexAssetEditorService.js");

function getNewAssetId($staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return IndexAssetEditorService$WonderEditor.getNodeIndex(editorState) + 1 | 0;
}

exports.getNewAssetId = getNewAssetId;
/* StateEditorService-WonderEditor Not a pure module */
