

import * as ScriptEngineService$WonderEditor from "../../../service/state/engine/script/ScriptEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function replaceToScriptEventFunctionAssetEventFunctionData(gameObject, scriptEventFunctionEntriesMap, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.getScriptComponent(gameObject, engineState);
  if (match !== undefined) {
    return ScriptEngineService$WonderEditor.replaceScriptEventFunctionDataByEntriesMap(match, scriptEventFunctionEntriesMap, engineState);
  } else {
    return engineState;
  }
}

export {
  replaceToScriptEventFunctionAssetEventFunctionData ,
  
}
/* ScriptEngineService-WonderEditor Not a pure module */
