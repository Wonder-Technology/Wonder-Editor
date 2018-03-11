'use strict';

import * as State$Wonderjs       from "../../../../../../node_modules/wonder.js/lib/es6_global/src/core/api/State.js";
import * as StateData$Wonderjs   from "../../../../../../node_modules/wonder.js/lib/es6_global/src/core/StateData.js";
import * as StateSystem$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/core/StateSystem.js";

function getStateData() {
  return StateData$Wonderjs.stateData;
}

function getState() {
  return StateSystem$Wonderjs.getState(StateData$Wonderjs.stateData);
}

function setState(state) {
  return StateSystem$Wonderjs.setState(StateData$Wonderjs.stateData, state);
}

var deepCopyStateForRestore = State$Wonderjs.deepCopyStateForRestore;

var restoreState = State$Wonderjs.restoreState;

export {
  deepCopyStateForRestore ,
  restoreState            ,
  getStateData            ,
  getState                ,
  setState                ,
  
}
/* State-Wonderjs Not a pure module */
