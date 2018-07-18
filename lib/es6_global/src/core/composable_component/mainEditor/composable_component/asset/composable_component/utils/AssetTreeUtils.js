

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as AssetUtils$WonderEditor from "../../utils/AssetUtils.js";
import * as StateAssetService$WonderEditor from "../../../../../../../service/state/asset/StateAssetService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../service/state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../service/state/editor/StateEditorService.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../../../../../service/state/asset/AssetTreeRootAssetService.js";
import * as CurrentNodeDataAssetService$WonderEditor from "../../../../../../../service/state/asset/CurrentNodeDataAssetService.js";
import * as CurrentNodeParentIdAssetService$WonderEditor from "../../../../../../../service/state/asset/CurrentNodeParentIdAssetService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

function onSelect(dispatchFunc, nodeType, nodeId) {
  StateAssetService$WonderEditor.setState(CurrentNodeParentIdAssetService$WonderEditor.setCurrentNodeParentId(nodeId, CurrentNodeDataAssetService$WonderEditor.setCurrentNodeData(/* record */[
                /* currentNodeId */nodeId,
                /* nodeType */nodeType
              ], CurrentNodeDataAssetService$WonderEditor.clearCurrentNodeData(StateAssetService$WonderEditor.getState(/* () */0)))));
  StateEditorService$WonderEditor.setState(CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* Asset */1, SceneEditorService$WonderEditor.clearCurrentSceneTreeNode(StateEditorService$WonderEditor.getState(/* () */0))));
  return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
}

function onDrop(dispatchFunc, param) {
  var removedId = param[1];
  var targetId = param[0];
  var assetState = StateAssetService$WonderEditor.getState(/* () */0);
  var match = AssetUtils$WonderEditor.isIdEqual(targetId, removedId);
  if (match) {
    return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
  } else {
    var match$1 = AssetUtils$WonderEditor.removeSpecificTreeNode(removedId, AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(assetState));
    StateAssetService$WonderEditor.setState(AssetTreeRootAssetService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertSourceTreeNodeToTargetTreeNodeChildren(targetId, match$1[1], match$1[0]), assetState));
    return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
  }
}

export {
  onSelect ,
  onDrop ,
  
}
/* AssetUtils-WonderEditor Not a pure module */
