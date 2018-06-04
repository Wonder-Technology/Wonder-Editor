

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as AssetUtils$WonderEditor from "../../utils/AssetUtils.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../service/state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../service/state/editor/StateEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

function getAssetTreeSign() {
  return "assetTreeRoot";
}

function handleSign(startSign) {
  return startSign === "assetTreeRoot";
}

function onSelect(param, nodeId) {
  var slientSetNodeParentIdFunc = param[1];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = AssetCurrentNodeIdEditorService$WonderEditor.getCurrentNodeId(editorState);
  if (match) {
    var match$1 = AssetUtils$WonderEditor.isIdEqual(match[0], nodeId);
    if (match$1) {
      Curry._1(slientSetNodeParentIdFunc, nodeId);
    } else {
      Curry._1(param[0], nodeId);
    }
  } else {
    Curry._1(slientSetNodeParentIdFunc, nodeId);
  }
  SceneEditorService$WonderEditor.clearCurrentSceneTreeNode(CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* AssetTree */1, editorState));
  return Curry._1(param[2], AppStore$WonderEditor.ReLoad);
}

function onDrop(dispatchFunc, param) {
  var removedId = param[1];
  var targetId = param[0];
  if (param[2] === "assetTreeRoot") {
    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
    var match = AssetUtils$WonderEditor.isIdEqual(targetId, removedId);
    if (match) {
      return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
    } else {
      var match$1 = AssetUtils$WonderEditor.removeSpecificTreeNodeFromAssetTree(removedId, AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
      StateEditorService$WonderEditor.setState(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(targetId, match$1[1], match$1[0]), editorState));
      return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
    }
  } else {
    return Log$WonderLog.log("can\'t drop to assetTree");
  }
}

export {
  getAssetTreeSign ,
  handleSign ,
  onSelect ,
  onDrop ,
  
}
/* Log-WonderLog Not a pure module */
