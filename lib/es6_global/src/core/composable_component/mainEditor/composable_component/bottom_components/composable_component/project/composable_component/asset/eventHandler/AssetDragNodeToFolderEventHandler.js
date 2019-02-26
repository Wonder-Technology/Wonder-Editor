

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, param$1) {
  var sourceNodeId = param$1[1];
  var targetFolderNodeId = param$1[0];
  var dispatchFunc = param[1];
  var match = NodeAssetService$WonderEditor.isIdEqual(targetFolderNodeId, sourceNodeId);
  if (match) {
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[/* Project */4]]
        ]);
    return /* () */0;
  } else {
    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
    var editorState$1 = OperateTreeAssetEditorService$WonderEditor.setNodeIsShowChildren(targetFolderNodeId, true, editorState);
    var sourceNode = OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(sourceNodeId, editorState$1);
    var match$1 = NodeNameAssetLogicService$WonderEditor.updateNodeName(sourceNode, OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(NodeNameAssetLogicService$WonderEditor.getNodeName(sourceNode, engineState), OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(targetFolderNodeId, editorState$1), engineState), engineState);
    var sourceNode$1 = match$1[1];
    var editorState$2 = OperateTreeAssetEditorService$WonderEditor.removeNode(sourceNode$1, editorState$1);
    var editorState$3 = OperateTreeAssetEditorService$WonderEditor.insertNode(targetFolderNodeId, sourceNode$1, editorState$2);
    StateEditorService$WonderEditor.setState(editorState$3);
    StateEngineService$WonderEditor.setState(match$1[0]);
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[/* Project */4]]
        ]);
    return /* () */0;
  }
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
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
