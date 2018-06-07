

import * as Block from "../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";

function updateWithSideEffects(state, func) {
  Curry._1(func, state);
  return /* Update */Block.__(0, [state]);
}

function sideEffects(func) {
  Curry._1(func, /* () */0);
  return /* NoUpdate */0;
}

export {
  updateWithSideEffects ,
  sideEffects ,
  
}
/* No side effect */
