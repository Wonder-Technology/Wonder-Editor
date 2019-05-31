

import * as StateAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/StateAPI.js";
import * as IsDebugMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/state/IsDebugMainService.js";
import * as StateDataMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/state/StateDataMainService.js";
import * as StateDataInspectorEngineService$WonderEditor from "./StateDataInspectorEngineService.js";

function getState(param) {
  return StateDataInspectorEngineService$WonderEditor.getStateData(/* () */0)[/* state */0];
}

function unsafeGetState(param) {
  return StateDataMainService$Wonderjs.unsafeGetState(StateDataInspectorEngineService$WonderEditor.getStateData(/* () */0));
}

function setState(state) {
  return StateDataMainService$Wonderjs.setState(StateDataInspectorEngineService$WonderEditor.getStateData(/* () */0), state);
}

function setIsDebug(isDebug) {
  return IsDebugMainService$Wonderjs.setIsDebug(StateDataInspectorEngineService$WonderEditor.getStateData(/* () */0), isDebug);
}

var deepCopyForRestore = StateAPI$Wonderjs.deepCopyForRestore;

var createState = StateAPI$Wonderjs.createState;

var getStateFromData = StateAPI$Wonderjs.getStateFromData;

var setStateToData = StateAPI$Wonderjs.setStateToData;

export {
  deepCopyForRestore ,
  createState ,
  getStateFromData ,
  setStateToData ,
  getState ,
  unsafeGetState ,
  setState ,
  setIsDebug ,
  
}
/* StateAPI-Wonderjs Not a pure module */
