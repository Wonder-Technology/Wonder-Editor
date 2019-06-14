

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
import * as MainEditorScriptAttributeUtils$WonderEditor from "../utils/MainEditorScriptAttributeUtils.js";
import * as ScriptAttributeNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function _changeScriptAttribute(currentScript, currentScriptAttributeNodeIdOpt, targetScriptAttributeNodeId, param) {
  var engineState = param[1];
  var editorState = param[0];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("targetScriptAttributeNodeId not be used", "be used"), (function (param) {
                        var match = ScriptAttributeNodeAssetEditorService$WonderEditor.getNameAndAttribute(targetScriptAttributeNodeId, editorState);
                        return Contract$WonderLog.assertFalse(ScriptEngineService$WonderEditor.hasScriptAttributeData(currentScript, match[0], engineState));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var match = ScriptAttributeNodeAssetEditorService$WonderEditor.getNameAndAttribute(targetScriptAttributeNodeId, editorState);
  var targetAttribute = match[1];
  var targetName = match[0];
  if (currentScriptAttributeNodeIdOpt !== undefined) {
    var match$1 = ScriptAttributeNodeAssetEditorService$WonderEditor.getNameAndAttribute(currentScriptAttributeNodeIdOpt, editorState);
    return ScriptEngineService$WonderEditor.replaceScriptAttribute(currentScript, /* tuple */[
                match$1[0],
                targetName
              ], targetAttribute, engineState);
  } else {
    return ScriptEngineService$WonderEditor.addScriptAttribute(currentScript, targetName, targetAttribute, engineState);
  }
}

function handleSelfLogic(param, sendFunc, param$1) {
  var targetScriptAttributeNodeId = param$1[2];
  var currentScriptAttributeNodeId = param$1[1];
  var script = param$1[0];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("currentScriptAttributeNodeId", "not"), (function (param) {
                        return Contract$WonderLog.assertExist(currentScriptAttributeNodeId);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var match = MainEditorScriptUtils$WonderEditor.isNodeIdEqual(currentScriptAttributeNodeId, targetScriptAttributeNodeId);
  if (match) {
    return /* () */0;
  } else {
    StateEngineService$WonderEditor.setState(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                return _changeScriptAttribute(script, currentScriptAttributeNodeId, targetScriptAttributeNodeId, param);
              })));
    return Curry._2(sendFunc, targetScriptAttributeNodeId, StateLogicService$WonderEditor.getStateToGetData((function (param) {
                      return MainEditorScriptAttributeUtils$WonderEditor.getUnUsedScriptAttributeNodeIds(script, param);
                    })));
  }
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
  /* _changeScriptAttribute */_changeScriptAttribute,
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
