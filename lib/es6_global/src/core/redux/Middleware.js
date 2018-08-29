

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ReduxThunk$WonderEditor from "./ReduxThunk.js";

function logger(_, next, action) {
  Curry._1(next, action);
  return /* () */0;
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
/* No side effect */
