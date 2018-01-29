'use strict';

import * as State$Wonderjs       from "../../../../../node_modules/wonder.js/lib/es6_global/src/core/api/State.js";
import * as StateData$Wonderjs   from "../../../../../node_modules/wonder.js/lib/es6_global/src/core/StateData.js";
import * as StateSystem$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/core/StateSystem.js";

function getStateData() {
  return StateData$Wonderjs.stateData;
}

var getState = StateSystem$Wonderjs.getState;

var setState = StateSystem$Wonderjs.setState;

var deepCopyStateForRestore = State$Wonderjs.deepCopyStateForRestore;

var restoreState = State$Wonderjs.restoreState;

export {
  getStateData            ,
  getState                ,
  setState                ,
  deepCopyStateForRestore ,
  restoreState            ,
  
}
/* State-Wonderjs Not a pure module */
