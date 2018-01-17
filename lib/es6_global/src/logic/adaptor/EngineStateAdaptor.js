'use strict';

import * as StateData$Wonderjs   from "../../../../../node_modules/wonder.js/lib/es6_global/src/core/StateData.js";
import * as StateSystem$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/core/StateSystem.js";

function getStateData() {
  return StateData$Wonderjs.stateData;
}

var getState = StateSystem$Wonderjs.getState;

var setState = StateSystem$Wonderjs.setState;

export {
  getStateData ,
  getState     ,
  setState     ,
  
}
/* StateSystem-Wonderjs Not a pure module */
