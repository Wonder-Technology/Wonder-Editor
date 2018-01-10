'use strict';

import * as Curry                   from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Reductive$WonderEditor  from "./Reductive.js";
import * as ReduxThunk$WonderEditor from "./ReduxThunk.js";

function logger(store, next, action) {
  var returnValue = Curry._1(next, action);
  var newState = Reductive$WonderEditor.Store[/* getState */5](store);
  console.log("the action:" + (String(action) + (" get new state:" + (String(newState) + " "))));
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
/* Reductive-WonderEditor Not a pure module */
