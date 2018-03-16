'use strict';

import * as StateAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/StateAPI.js";

function getStateData() {
  return StateAPI$Wonderjs.getStateData(/* () */0);
}

function getState() {
  return StateAPI$Wonderjs.getState(/* () */0);
}

var setState = StateAPI$Wonderjs.setState;

var deepCopyForRestore = StateAPI$Wonderjs.deepCopyForRestore;

var restoreState = StateAPI$Wonderjs.restoreState;

export {
  deepCopyForRestore ,
  restoreState       ,
  getStateData       ,
  getState           ,
  setState           ,
  
}
/* StateAPI-Wonderjs Not a pure module */
