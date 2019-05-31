

import * as ScriptEventFunctionAPI$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/api/script/ScriptEventFunctionAPI.js";

function createEmptyScriptEventFunctionData(param) {
  return ScriptEventFunctionAPI$Wonderjs.createScriptEventFunctionData({
              init: undefined,
              update: undefined,
              dispose: undefined
            });
}

var createScriptEventFunctionData = ScriptEventFunctionAPI$Wonderjs.createScriptEventFunctionData;

var enableScriptEventFunction = ScriptEventFunctionAPI$Wonderjs.enableScriptEventFunction;

var disableScriptEventFunction = ScriptEventFunctionAPI$Wonderjs.disableScriptEventFunction;

var isScriptEventFunctionEnable = ScriptEventFunctionAPI$Wonderjs.isScriptEventFunctionEnable;

export {
  createScriptEventFunctionData ,
  createEmptyScriptEventFunctionData ,
  enableScriptEventFunction ,
  disableScriptEventFunction ,
  isScriptEventFunctionEnable ,
  
}
/* ScriptEventFunctionAPI-Wonderjs Not a pure module */
