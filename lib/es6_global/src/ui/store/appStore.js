'use strict';

import * as Caml_exceptions          from "../../../../../node_modules/bs-platform/lib/es6/caml_exceptions.js";
import * as Reductive$WonderEditor   from "../utils/reductive.js";
import * as Middleware$WonderEditor  from "../utils/middleware.js";
import * as SimpleStore$WonderEditor from "./simpleStore.js";

function stringReduce(state, action) {
  if (action !== 0) {
    return state + "b";
  } else {
    return state + "a";
  }
}

var StringAction = Caml_exceptions.create("AppStore-WonderEditor.StringAction");

var CounterAction = Caml_exceptions.create("AppStore-WonderEditor.CounterAction");

function appReducer(state, action) {
  if (action[0] === StringAction) {
    return /* record */[
            /* counter */state[/* counter */0],
            /* notACounter */stringReduce(state[/* notACounter */1], action[1])
          ];
  } else if (action[0] === CounterAction) {
    return /* record */[
            /* counter */SimpleStore$WonderEditor.countReducer(state[/* counter */0], action[1]),
            /* notACounter */state[/* notACounter */1]
          ];
  } else {
    return state;
  }
}

function thunkedLogger(store, next) {
  return (function (param) {
      return Middleware$WonderEditor.thunk(store, (function (param) {
                    return Middleware$WonderEditor.logger(store, next, param);
                  }), param);
    });
}

var store = Reductive$WonderEditor.Store[/* create */0](appReducer, /* record */[
      /* counter */0,
      /* notACounter */""
    ], /* Some */[thunkedLogger], /* () */0);

export {
  stringReduce  ,
  StringAction  ,
  CounterAction ,
  appReducer    ,
  thunkedLogger ,
  store         ,
  
}
/* store Not a pure module */
