

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as AssetTreeUtils$WonderEditor from "../../utils/AssetTreeUtils.js";
import * as SceneGraphUtils$WonderEditor from "../../../../../../../../left_components/composable_component/sceneTree/utils/SceneGraphUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TreeRootAssetEditorService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/CurrentNodeDataAssetEditorService.js";
import * as RemoveAssetTreeNodeAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/RemoveAssetTreeNodeAssetLogicService.js";
import * as CurrentNodeParentIdAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/CurrentNodeParentIdAssetEditorService.js";
import * as RemovedAssetIdArrayAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/RemovedAssetIdArrayAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _isRemoveAssetTreeNode(currentNodeId, currentNodeParentId) {
  return TreeAssetEditorService$WonderEditor.isIdEqual(currentNodeParentId, currentNodeId);
}

function handleSelfLogic(param, _, _$1) {
  var dispatchFunc = param[1];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = CurrentNodeDataAssetEditorService$WonderEditor.unsafeGetCurrentNodeData(editorState);
  var currentNodeId = match[/* currentNodeId */0];
  var match$1 = RemoveAssetTreeNodeAssetLogicService$WonderEditor.removeSpecificTreeNode(currentNodeId, TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
  var newAssetTreeRoot = match$1[0];
  var match$2 = RemoveAssetTreeNodeAssetLogicService$WonderEditor.deepRemoveTreeNode(match$1[1], /* tuple */[
        editorState,
        engineState
      ]);
  var match$3 = match$2[0];
  var editorState$1 = match$3[0];
  StateLogicService$WonderEditor.refreshEngineState(match$3[1]);
  var editorState$2 = RemovedAssetIdArrayAssetEditorService$WonderEditor.setRemovedAssetIdArray(RemovedAssetIdArrayAssetEditorService$WonderEditor.getRemovedAssetIdArray(editorState$1).concat(match$2[1]), editorState$1);
  var currentNodeParentId = AssetTreeUtils$WonderEditor.getTargetTreeNodeId(editorState$2);
  var match$4 = TreeAssetEditorService$WonderEditor.isIdEqual(currentNodeParentId, currentNodeId);
  var editorState$3 = match$4 ? CurrentNodeDataAssetEditorService$WonderEditor.clearCurrentNodeData(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(newAssetTreeRoot, CurrentNodeParentIdAssetEditorService$WonderEditor.clearCurrentNodeParentId(editorState$2))) : CurrentNodeDataAssetEditorService$WonderEditor.clearCurrentNodeData(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(newAssetTreeRoot, editorState$2));
  StateEditorService$WonderEditor.setState(editorState$3);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[StateLogicService$WonderEditor.getStateToGetData(SceneGraphUtils$WonderEditor.getSceneGraphDataFromEngine)]
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* All */1]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _isRemoveAssetTreeNode */_isRemoveAssetTreeNode,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
