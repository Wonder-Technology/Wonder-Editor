

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as StateAssetService$WonderEditor from "../../../../../../../../service/state/asset/StateAssetService.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../../../asset/utils/AssetTreeNodeUtils.js";
import * as NodeMapAssetService$WonderEditor from "../../../../../../../../service/state/asset/NodeMapAssetService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function renameAssetTreeNode(dispatchFunc, value, nodeId, assetState) {
  var __x = AssetTreeNodeUtils$WonderEditor.renameNodeResult(value, SparseMapService$WonderCommonlib.unsafeGet(nodeId, NodeMapAssetService$WonderEditor.unsafeGetNodeMap(assetState)));
  StateAssetService$WonderEditor.setState(NodeMapAssetService$WonderEditor.setResult(nodeId, __x, assetState));
  return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
}

export {
  renameAssetTreeNode ,
  
}
/* StateAssetService-WonderEditor Not a pure module */
