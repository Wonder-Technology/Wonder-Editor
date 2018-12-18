

import * as Most from "most";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";

function callFunc(func) {
  return Most.map((function (func) {
                return Curry._1(func, /* () */0);
              }), Most.just(func));
}

function callStreamFunc(func) {
  return Most.flatMap((function (func) {
                return Curry._1(func, /* () */0);
              }), Most.just(func));
}

function unsubscribeDomEventStream (domEventStreamSubscription){
  domEventStreamSubscription.unsubscribe();
  };

export {
  callFunc ,
  callStreamFunc ,
  unsubscribeDomEventStream ,
  
}
/* most Not a pure module */
