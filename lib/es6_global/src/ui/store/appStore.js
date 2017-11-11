'use strict';

import * as Caml_exceptions          from "../../../../../node_modules/bs-platform/lib/es6/caml_exceptions.js";
import * as StringStore$WonderEditor from "./stringStore.js";

var StringAction = Caml_exceptions.create("AppStore-WonderEditor.StringAction");

var ReplaceState = Caml_exceptions.create("AppStore-WonderEditor.ReplaceState");

function appReducter(state, action) {
  if (action[0] === StringAction) {
    return /* record */[/* stringState */StringStore$WonderEditor.stringReducer(state[/* stringState */0], action[1])];
  } else if (action[0] === ReplaceState) {
    return action[1];
  } else {
    return state;
  }
}

var state = /* record */[/* stringState : record */[
    /* text */"fck ",
    /* age */0
  ]];

export {
  StringAction ,
  ReplaceState ,
  state        ,
  appReducter  ,
  
}
/* No side effect */
