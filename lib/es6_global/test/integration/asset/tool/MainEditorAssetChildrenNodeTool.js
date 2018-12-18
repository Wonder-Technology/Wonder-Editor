

import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as FileBox$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/atom_component/fileBox/ui/FileBox.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";

function selectTextureNode(nodeId, $staropt$star, $staropt$star$1, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : -1;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return FileBox$WonderEditor.Method[/* onSelect */0](nodeId, /* Texture */1, dispatchFunc, $$event);
}

function selectMaterialNode(nodeId, $staropt$star, $staropt$star$1, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : -1;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return FileBox$WonderEditor.Method[/* onSelect */0](nodeId, /* Material */3, dispatchFunc, $$event);
}

function selectFolderNode(nodeId, $staropt$star, $staropt$star$1, param) {
  var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : -1;
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return FileBox$WonderEditor.Method[/* onSelect */0](nodeId, /* Folder */0, dispatchFunc, $$event);
}

export {
  selectTextureNode ,
  selectMaterialNode ,
  selectFolderNode ,
  
}
/* FileBox-WonderEditor Not a pure module */
