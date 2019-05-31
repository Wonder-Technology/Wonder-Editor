

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Console$WonderEditor from "../../../../../../../../../external/Console.js";
import * as LogUtils$WonderEditor from "../../../../../../../../../utils/console/LogUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../../utils/ui/ConsoleUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as SerializeService$WonderEditor from "../../../../../../../../../../service/atom/SerializeService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as ScriptEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/script/ScriptEngineService.js";
import * as ScriptEventFunctionEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/script/ScriptEventFunctionEngineService.js";
import * as ScriptEventFunctionNodeAssetService$WonderEditor from "../../../../../../../../../../service/record/editor/asset/ScriptEventFunctionNodeAssetService.js";
import * as ScriptEventFunctionNodeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/ScriptEventFunctionNodeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function _buildFunctionWithJsObjStr(jsObjStr) {
  return "\n    (function() {\n      return " + (String(jsObjStr) + "\n    }())\n  ");
}

function _convertEventFunctionJsObjStrToData(jsObjStr) {
  return ScriptEventFunctionEngineService$WonderEditor.createScriptEventFunctionData(SerializeService$WonderEditor.deserializeFunction(_buildFunctionWithJsObjStr(jsObjStr)));
}

function handleSelfLogic(param, param$1, param$2) {
  var eventFunctionJsObjStr = param$2[2];
  var name = param$2[1];
  var nodeId = param$2[0];
  return Curry._2(Console$WonderEditor.tryCatch, (function (param) {
                var newEventFunctionData = ScriptEventFunctionEngineService$WonderEditor.createScriptEventFunctionData(SerializeService$WonderEditor.deserializeFunction(_buildFunctionWithJsObjStr(eventFunctionJsObjStr)));
                var partial_arg = ScriptEventFunctionNodeAssetService$WonderEditor.buildNodeData(name, newEventFunctionData);
                StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                        return ScriptEventFunctionNodeAssetEditorService$WonderEditor.setNodeData(nodeId, partial_arg, param);
                      }));
                return StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                              return ScriptEngineService$WonderEditor.updateEventFunctionInAllScriptComponents(name, newEventFunctionData, param);
                            }));
              }), (function (e) {
                var message = e.message;
                var partial_arg = LogUtils$WonderEditor.buildErrorMessage("" + (String(message) + ""), "", "", "");
                return StateLogicService$WonderEditor.getEditorState((function (param) {
                              return ConsoleUtils$WonderEditor.error(partial_arg, param);
                            }));
              }));
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
  /* _buildFunctionWithJsObjStr */_buildFunctionWithJsObjStr,
  /* _convertEventFunctionJsObjStrToData */_convertEventFunctionJsObjStrToData,
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
