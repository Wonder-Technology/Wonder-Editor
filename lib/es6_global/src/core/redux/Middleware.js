

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Reductive$WonderEditor from "./Reductive.js";
import * as ReduxThunk$WonderEditor from "./ReduxThunk.js";

function logger(store, next, action) {
  var returnValue = Curry._1(next, action);
  Log$WonderLog.print(/* tuple */[
        "action : ",
        action
      ]);
  Log$WonderLog.print(/* tuple */[
        "redux store : ",
        Reductive$WonderEditor.Store[/* getState */5](store)
      ]);
  return returnValue;
}

function thunk(store, next, action) {
  if (action[0] === ReduxThunk$WonderEditor.Thunk) {
    return Curry._1(action[1], store);
  } else {
    return Curry._1(next, action);
  }
}

export {
  logger ,
  thunk ,
  
}
/* Log-WonderLog Not a pure module */
