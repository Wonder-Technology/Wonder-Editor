

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../../../asset/utils/AssetTreeNodeUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetNodeMapEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";

function renameAssetTreeNode(dispatchFunc, value, nodeId, editorState) {
  var __x = AssetTreeNodeUtils$WonderEditor.renameNodeResult(value, SparseMapService$WonderCommonlib.unsafeGet(nodeId, AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(editorState)));
  StateEditorService$WonderEditor.setState(AssetNodeMapEditorService$WonderEditor.setResult(nodeId, __x, editorState));
  return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
}

export {
  renameAssetTreeNode ,
  
}
/* AssetTreeNodeUtils-WonderEditor Not a pure module */
