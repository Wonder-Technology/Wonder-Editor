'use strict';

var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var FolderBox$WonderEditor = require("../../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/atom_component/folderBox/ui/FolderBox.js");

function onDoubleClick(nodeId, $staropt$star, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  return FolderBox$WonderEditor.Method[/* onDoubleClick */0](dispatchFunc, nodeId);
}

exports.onDoubleClick = onDoubleClick;
/* TestTool-WonderEditor Not a pure module */
