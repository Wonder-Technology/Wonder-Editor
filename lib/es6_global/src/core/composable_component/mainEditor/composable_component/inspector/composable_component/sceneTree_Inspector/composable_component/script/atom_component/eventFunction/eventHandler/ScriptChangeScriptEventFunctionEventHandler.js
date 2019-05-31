

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as ScriptEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/script/ScriptEngineService.js";
import * as MainEditorScriptUtils$WonderEditor from "../../../utils/MainEditorScriptUtils.js";
import * as MainEditorScriptEventFunctionUtils$WonderEditor from "../utils/MainEditorScriptEventFunctionUtils.js";
import * as ScriptEventFunctionNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ScriptEventFunctionNodeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function _changeScriptEventFunction(currentScript, currentScriptEventFunctionNodeIdOpt, targetScriptEventFunctionNodeId, param) {
  var engineState = param[1];
  var editorState = param[0];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("targetScriptEventFunctionNodeId not be used", "be used"), (function (param) {
                        var match = ScriptEventFunctionNodeAssetEditorService$WonderEditor.getNameAndData(targetScriptEventFunctionNodeId, editorState);
                        return Contract$WonderLog.assertFalse(ScriptEngineService$WonderEditor.hasScriptEventFunctionData(currentScript, match[0], engineState));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var match = ScriptEventFunctionNodeAssetEditorService$WonderEditor.getNameAndData(targetScriptEventFunctionNodeId, editorState);
  var targetEventFunction = match[1];
  var targetName = match[0];
  if (currentScriptEventFunctionNodeIdOpt !== undefined) {
    var match$1 = ScriptEventFunctionNodeAssetEditorService$WonderEditor.getNameAndData(currentScriptEventFunctionNodeIdOpt, editorState);
    return ScriptEngineService$WonderEditor.replaceScriptEventFunctionData(currentScript, /* tuple */[
                match$1[0],
                targetName
              ], targetEventFunction, engineState);
  } else {
    return ScriptEngineService$WonderEditor.addScriptEventFunctionData(currentScript, targetName, targetEventFunction, engineState);
  }
}

function handleSelfLogic(param, sendFunc, param$1) {
  var targetScriptEventFunctionNodeId = param$1[2];
  var currentScriptEventFunctionNodeId = param$1[1];
  var script = param$1[0];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("currentScriptEventFunctionNodeId", "not"), (function (param) {
                        return Contract$WonderLog.assertExist(currentScriptEventFunctionNodeId);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var match = MainEditorScriptUtils$WonderEditor.isNodeIdEqual(currentScriptEventFunctionNodeId, targetScriptEventFunctionNodeId);
  if (match) {
    return /* () */0;
  } else {
    StateEngineService$WonderEditor.setState(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                return _changeScriptEventFunction(script, currentScriptEventFunctionNodeId, targetScriptEventFunctionNodeId, param);
              })));
    return Curry._2(sendFunc, targetScriptEventFunctionNodeId, StateLogicService$WonderEditor.getStateToGetData((function (param) {
                      return MainEditorScriptEventFunctionUtils$WonderEditor.getUnUsedScriptEventFunctionNodeIds(script, param);
                    })));
  }
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
  /* _changeScriptEventFunction */_changeScriptEventFunction,
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
