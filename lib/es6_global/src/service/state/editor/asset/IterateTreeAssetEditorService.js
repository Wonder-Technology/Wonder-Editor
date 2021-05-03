

import * as TreeAssetEditorService$WonderEditor from "./TreeAssetEditorService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../record/editor/asset/IterateTreeAssetService.js";

function filter(editorState, acc, pushNodeFunc, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var predTextureNodeFunc = $staropt$star !== undefined ? $staropt$star : (function (node) {
        return false;
      });
  var predMaterialNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (node) {
        return false;
      });
  var predScriptEventFunctionNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function (node) {
        return false;
      });
  var predScriptAttributeNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function (node) {
        return false;
      });
  var predWDBNodeFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : (function (node) {
        return false;
      });
  var predAssetBundleNodeFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : (function (node) {
        return false;
      });
  var predFolderNodeFunc = $staropt$star$6 !== undefined ? $staropt$star$6 : (function (node) {
        return false;
      });
  return IterateTreeAssetService$WonderEditor.filter(TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), acc, pushNodeFunc, predTextureNodeFunc, predMaterialNodeFunc, predScriptEventFunctionNodeFunc, predScriptAttributeNodeFunc, predWDBNodeFunc, predAssetBundleNodeFunc, predFolderNodeFunc, /* () */0);
}

export {
  filter ,
  
}
/* TreeAssetEditorService-WonderEditor Not a pure module */
