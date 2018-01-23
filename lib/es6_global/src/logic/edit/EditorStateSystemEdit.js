'use strict';

import * as Curry     from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable from "../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";

function getState(data) {
  return data[/* state */0];
}

function setState(data, state) {
  data[/* state */0] = state;
  return state;
}

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

function storeEditorState(currentState) {
  past[0] = Immutable.Stack[/* addFirst */17](currentState, past[0]);
  future[0] = Immutable.Stack[/* empty */20](/* () */0);
  return /* () */0;
}

function clearEditorState() {
  past[0] = Immutable.Stack[/* empty */20](/* () */0);
  future[0] = Immutable.Stack[/* empty */20](/* () */0);
  return /* () */0;
}

export {
  getState         ,
  setState         ,
  past             ,
  future           ,
  goBack           ,
  goForward        ,
  storeEditorState ,
  clearEditorState ,
  
}
/* past Not a pure module */
