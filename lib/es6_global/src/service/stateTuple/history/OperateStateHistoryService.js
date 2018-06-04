

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AllStateData$WonderEditor from "../data/AllStateData.js";
import * as StackService$WonderEditor from "../../atom/StackService.js";

function operateHistory(currentState, currentStack, getNewHistoryStateFunc) {
  var match = StackService$WonderEditor.first(currentStack);
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
/* AllStateData-WonderEditor Not a pure module */
