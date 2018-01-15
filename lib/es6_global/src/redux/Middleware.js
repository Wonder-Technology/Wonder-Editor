'use strict';

import * as Curry                            from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                    from "../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Reductive$WonderEditor           from "./Reductive.js";
import * as ReduxThunk$WonderEditor          from "./ReduxThunk.js";
import * as EditorStateDataEdit$WonderEditor from "../logic/edit/EditorStateDataEdit.js";

function logger(store, next, action) {
  var returnValue = Curry._1(next, action);
  Log$WonderLog.debug((function () {
          var partial_arg = "" + (String(action) + "");
          var partial_arg$1 = "";
          return (function (param) {
              return Log$WonderLog.buildDebugMessage(partial_arg$1, partial_arg, param);
            });
        }), EditorStateDataEdit$WonderEditor.getStateIsDebug(/* () */0));
  console.log(action);
  console.log(Reductive$WonderEditor.Store[/* getState */5](store));
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
  thunk  ,
  
}
/* Log-WonderLog Not a pure module */
