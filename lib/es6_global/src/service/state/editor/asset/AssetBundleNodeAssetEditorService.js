

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as NodeAssetEditorService$WonderEditor from "./NodeAssetEditorService.js";
import * as IterateTreeAssetEditorService$WonderEditor from "./IterateTreeAssetEditorService.js";

var addAssetBundleNodeToAssetTree = NodeAssetEditorService$WonderEditor.addNodeToAssetTree;

function findAllAssetBundleNodes(editorState) {
  return IterateTreeAssetEditorService$WonderEditor.filter(editorState, /* array */[], ArrayService$WonderEditor.push, undefined, undefined, undefined, undefined, undefined, (function (node) {
                return true;
              }), undefined, /* () */0);
}

export {
  addAssetBundleNodeToAssetTree ,
  findAllAssetBundleNodes ,
  
}
/* ArrayService-WonderEditor Not a pure module */
