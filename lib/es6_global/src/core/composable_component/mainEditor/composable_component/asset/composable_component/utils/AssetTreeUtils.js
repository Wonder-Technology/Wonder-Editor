

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as AssetUtils$WonderEditor from "../../utils/AssetUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../service/state/editor/StateEditorService.js";
import * as CurrentNodeEditorService$WonderEditor from "../../../../../../../service/state/editor/CurrentNodeEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../../../service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

function getFlag() {
  return /* AssetTree */1;
}

function handleFlag(startFlag) {
  if (startFlag) {
    return startFlag[0] === /* AssetTree */1;
  } else {
    return false;
  }
}

function onSelect(dispatchFunc, nodeId) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* AssetTree */1, AssetCurrentNodeParentIdEditorService$WonderEditor.setCurrentNodeParentId(nodeId, AssetCurrentNodeIdEditorService$WonderEditor.setCurrentNodeId(nodeId, CurrentNodeEditorService$WonderEditor.clearCurrentNode(editorState))));
        }));
  return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
}

function onDrop(dispatchFunc, param) {
  var currentDragSource = param[2];
  var removedId = param[1];
  var targetId = param[0];
  if (currentDragSource) {
    var match = currentDragSource[0] === /* AssetTree */1;
    if (match) {
      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
      var match$1 = AssetUtils$WonderEditor.isIdEqual(targetId, removedId);
      if (match$1) {
        return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
      } else {
        var match$2 = AssetUtils$WonderEditor.removeSpecificTreeNode(removedId, AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
        StateEditorService$WonderEditor.setState(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertSourceTreeNodeToTargetTreeNodeChildren(targetId, match$2[1], match$2[0]), editorState));
        return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
      }
    } else {
      return Log$WonderLog.warn("can\'t drop to assetTree");
    }
  } else {
    return Log$WonderLog.warn("can\'t drop to assetTree");
  }
}

export {
  getFlag ,
  handleFlag ,
  onSelect ,
  onDrop ,
  
}
/* Log-WonderLog Not a pure module */
