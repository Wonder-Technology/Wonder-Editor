

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
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
  var removedId = param[1];
  var targetId = param[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = AssetUtils$WonderEditor.isIdEqual(targetId, removedId);
  if (match) {
    return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
  } else {
    var match$1 = AssetUtils$WonderEditor.removeSpecificTreeNode(removedId, AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
    StateEditorService$WonderEditor.setState(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertSourceTreeNodeToTargetTreeNodeChildren(targetId, match$1[1], match$1[0]), editorState));
    return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
  }
}

export {
  getFlag ,
  handleFlag ,
  onSelect ,
  onDrop ,
  
}
/* AssetUtils-WonderEditor Not a pure module */
