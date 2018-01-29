'use strict';

import * as Curry                     from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable                 from "../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as AllStateData$WonderEditor from "../AllStateData.js";

function operateHistory(currentState, currentStack, getNewHistoryStateFunc) {
  var match = Curry._1(Immutable.Stack[/* first */14], currentStack);
  if (match) {
    AllStateData$WonderEditor.setHistoryState(Curry._1(getNewHistoryStateFunc, /* () */0));
    return match[0];
  } else {
    return currentState;
  }
}

export {
  operateHistory ,
  
}
/* Immutable Not a pure module */
