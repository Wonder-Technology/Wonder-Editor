

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as DisposeTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/DisposeTreeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var _isRemoveAssetTreeNode = NodeAssetService$WonderEditor.isIdEqual;

function handleSelfLogic(param, param$1, param$2) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var currentNodeId = CurrentNodeIdAssetEditorService$WonderEditor.unsafeGetCurrentNodeId(editorState);
  var match = DisposeTreeAssetLogicService$WonderEditor.disposeNode(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(currentNodeId, editorState), /* tuple */[
        editorState,
        engineState
      ]);
  var editorState$1 = match[0];
  StateLogicService$WonderEditor.refreshEngineState(match[1]);
  var selectedFolderNodeIdInAssetTree = TreeAssetEditorService$WonderEditor.getSelectedFolderNodeIdInAssetTree(editorState$1);
  var match$1 = NodeAssetService$WonderEditor.isIdEqual(currentNodeId, selectedFolderNodeIdInAssetTree);
  var editorState$2 = match$1 ? CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(editorState$1)) : CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(editorState$1);
  StateEditorService$WonderEditor.setState(editorState$2);
  Curry._1(param[1], [
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
