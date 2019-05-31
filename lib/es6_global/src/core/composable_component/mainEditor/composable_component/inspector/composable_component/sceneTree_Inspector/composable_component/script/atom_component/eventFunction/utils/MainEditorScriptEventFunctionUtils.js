

import * as ArrayService$WonderEditor from "../../../../../../../../../../../../service/atom/ArrayService.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as ScriptEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/script/ScriptEngineService.js";
import * as ScriptEventFunctionNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/ScriptEventFunctionNodeAssetService.js";
import * as ScriptEventFunctionNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ScriptEventFunctionNodeAssetEditorService.js";

function getUnUsedScriptEventFunctionNodes(script, param) {
  var allScriptEventFunctionNodes = ScriptEventFunctionNodeAssetEditorService$WonderEditor.findAllScriptEventFunctionNodes(param[0]);
  var scriptAllEventFunctionEntries = ScriptEngineService$WonderEditor.getScriptAllEventFunctionEntries(script, param[1]);
  var allEventFunctionNames = scriptAllEventFunctionEntries.map((function (param) {
          return param[0];
        }));
  return ArrayService$WonderEditor.excludeWithFunc(scriptAllEventFunctionEntries, (function (scriptAllEventFunctionEntries, scriptEventFunctionNode) {
                return allEventFunctionNames.includes(ScriptEventFunctionNodeAssetService$WonderEditor.getNodeName(scriptEventFunctionNode));
              }), allScriptEventFunctionNodes);
}

function getUnUsedScriptEventFunctionNodeIds(script, param) {
  return getUnUsedScriptEventFunctionNodes(script, /* tuple */[
                param[0],
                param[1]
              ]).map(NodeAssetService$WonderEditor.getNodeId);
}

export {
  getUnUsedScriptEventFunctionNodes ,
  getUnUsedScriptEventFunctionNodeIds ,
  
}
/* ArrayService-WonderEditor Not a pure module */
