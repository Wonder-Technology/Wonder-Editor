'use strict';

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";

function dispatchAction(dispatch, actionFunc, stateTuple) {
  Curry._1(dispatch, Curry._1(actionFunc, stateTuple));
  return stateTuple;
}

export {
  dispatchAction ,
  
}
/* No side effect */
