

import * as StateAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/StateAPI.js";
import * as StateDataMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/state/StateDataMainService.js";

function getStateData(param) {
  return StateAPI$Wonderjs.getStateData(/* () */0);
}

function setState(state) {
  return StateDataMainService$Wonderjs.setState(StateAPI$Wonderjs.getStateData(/* () */0), state);
}

function isEqual(state1, state2) {
  return state1 === state2;
}

export {
  getStateData ,
  setState ,
  isEqual ,
  
}
/* StateAPI-Wonderjs Not a pure module */
