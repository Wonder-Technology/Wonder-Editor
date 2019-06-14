

import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ScriptEngineService$WonderEditor from "../../../../state/engine/script/ScriptEngineService.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";

function _getScriptDataEntriesArrNotInScriptAssets(scriptDataEntriesMap, scriptAssetDataEntriesMap) {
  if (scriptDataEntriesMap !== undefined) {
    return scriptDataEntriesMap.filter((function (param) {
                  return !ImmutableHashMapService$WonderCommonlib.has(param[0], scriptAssetDataEntriesMap);
                }));
  } else {
    return ArrayService$WonderCommonlib.createEmpty(/* () */0);
  }
}

function getScriptEventFunctionDataEntriesArrNotInScriptAssets(script, scriptAssetEventFunctionEntriesMap, engineState) {
  return _getScriptDataEntriesArrNotInScriptAssets(ScriptEngineService$WonderEditor.getScriptEventFunctionDataEntries(script, engineState), scriptAssetEventFunctionEntriesMap);
}

function getScriptAttributeEntriesArrNotInScriptAssets(script, scriptAssetAttributeEntriesMap, engineState) {
  return _getScriptDataEntriesArrNotInScriptAssets(ScriptEngineService$WonderEditor.getScriptAttributeEntries(script, engineState), scriptAssetAttributeEntriesMap);
}

export {
  _getScriptDataEntriesArrNotInScriptAssets ,
  getScriptEventFunctionDataEntriesArrNotInScriptAssets ,
  getScriptAttributeEntriesArrNotInScriptAssets ,
  
}
/* ScriptEngineService-WonderEditor Not a pure module */
