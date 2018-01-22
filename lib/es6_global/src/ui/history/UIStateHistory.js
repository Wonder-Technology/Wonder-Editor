'use strict';

import * as Curry     from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable from "../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";

var past = [Immutable.Stack[/* empty */20](/* () */0)];

var future = [Immutable.Stack[/* empty */20](/* () */0)];

function goBack(currentState) {
  var match = Curry._1(Immutable.Stack[/* first */14], past[0]);
  if (match) {
    future[0] = Immutable.Stack[/* addFirst */17](currentState, future[0]);
    past[0] = Immutable.Stack[/* removeFirstOrRaise */19](past[0]);
    return match[0];
  } else {
    return currentState;
  }
}

function goForward(currentState) {
  var match = Curry._1(Immutable.Stack[/* first */14], future[0]);
  if (match) {
    past[0] = Immutable.Stack[/* addFirst */17](currentState, past[0]);
    future[0] = Immutable.Stack[/* removeFirstOrRaise */19](future[0]);
    return match[0];
  } else {
    return currentState;
  }
}

function storeUIState(currentState) {
  past[0] = Immutable.Stack[/* addFirst */17](currentState, past[0]);
  future[0] = Immutable.Stack[/* empty */20](/* () */0);
  return /* () */0;
}

function clearUIState() {
  past[0] = Immutable.Stack[/* empty */20](/* () */0);
  future[0] = Immutable.Stack[/* empty */20](/* () */0);
  return /* () */0;
}

export {
  past         ,
  future       ,
  goBack       ,
  goForward    ,
  storeUIState ,
  clearUIState ,
  
}
/* past Not a pure module */
