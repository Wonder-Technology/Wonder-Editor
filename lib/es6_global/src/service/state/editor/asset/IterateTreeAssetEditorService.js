

import * as TreeAssetEditorService$WonderEditor from "./TreeAssetEditorService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../record/editor/asset/IterateTreeAssetService.js";

function filter(editorState, acc, pushNodeFunc, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var predTextureNodeFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return false;
      });
  var predMaterialNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function () {
        return false;
      });
  var predWDBNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function () {
        return false;
      });
  var predFolderNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function () {
        return false;
      });
  return IterateTreeAssetService$WonderEditor.filter(TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), acc, pushNodeFunc, predTextureNodeFunc, predMaterialNodeFunc, predWDBNodeFunc, predFolderNodeFunc, /* () */0);
}

export {
  filter ,
  
}
/* TreeAssetEditorService-WonderEditor Not a pure module */
