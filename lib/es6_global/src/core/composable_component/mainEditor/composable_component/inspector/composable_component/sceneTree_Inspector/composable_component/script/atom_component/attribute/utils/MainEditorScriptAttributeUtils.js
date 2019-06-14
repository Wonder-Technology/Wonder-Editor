

import * as ArrayService$WonderEditor from "../../../../../../../../../../../../service/atom/ArrayService.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as ScriptEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/script/ScriptEngineService.js";
import * as ScriptAttributeNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/ScriptAttributeNodeAssetService.js";
import * as ScriptAttributeNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js";

function getUnUsedScriptAttributeNodes(script, param) {
  var allScriptAttributeNodes = ScriptAttributeNodeAssetEditorService$WonderEditor.findAllScriptAttributeNodes(param[0]);
  var scriptAllAttributeEntries = ScriptEngineService$WonderEditor.getScriptAllAttributeEntries(script, param[1]);
  var allAttributeNames = scriptAllAttributeEntries.map((function (param) {
          return param[0];
        }));
  return ArrayService$WonderEditor.excludeWithFunc(scriptAllAttributeEntries, (function (scriptAllAttributeEntries, scriptAttributeNode) {
                return allAttributeNames.includes(ScriptAttributeNodeAssetService$WonderEditor.getNodeName(scriptAttributeNode));
              }), allScriptAttributeNodes);
}

function getUnUsedScriptAttributeNodeIds(script, param) {
  return getUnUsedScriptAttributeNodes(script, /* tuple */[
                param[0],
                param[1]
              ]).map(NodeAssetService$WonderEditor.getNodeId);
}

export {
  getUnUsedScriptAttributeNodes ,
  getUnUsedScriptAttributeNodeIds ,
  
}
/* ArrayService-WonderEditor Not a pure module */
