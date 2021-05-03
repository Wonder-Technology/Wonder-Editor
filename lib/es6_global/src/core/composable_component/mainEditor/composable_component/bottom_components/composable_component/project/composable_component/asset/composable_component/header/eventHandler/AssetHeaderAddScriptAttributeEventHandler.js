

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as IdAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/IdAssetEditorService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as ScriptAttributeEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/script/ScriptAttributeEngineService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as ScriptAttributeNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/ScriptAttributeNodeAssetService.js";
import * as ScriptAttributeNodeNameAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/ScriptAttributeNodeNameAssetService.js";
import * as ScriptAttributeNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function handleSelfLogic(param, param$1, param$2) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = StateLogicService$WonderEditor.getEditorState(IdAssetEditorService$WonderEditor.generateNodeId);
  var editorState = match[0];
  var targetTreeNode = OperateTreeAssetEditorService$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState);
  var scriptAttributeName = OperateTreeAssetLogicService$WonderEditor.getUniqueScriptAttributeNodeName(ScriptAttributeNodeNameAssetService$WonderEditor.getNewAttributeName(/* () */0), targetTreeNode, /* tuple */[
        editorState,
        engineState
      ]);
  var editorState$1 = ScriptAttributeNodeAssetEditorService$WonderEditor.addScriptAttributeNodeToAssetTree(targetTreeNode, ScriptAttributeNodeAssetService$WonderEditor.buildNode(match[1], scriptAttributeName, ScriptAttributeEngineService$WonderEditor.createScriptAttribute(/* () */0)), editorState);
  StateEditorService$WonderEditor.setState(editorState$1);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Project */4]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState,
      setUndoValueToCopiedEngineStateForPromise
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
