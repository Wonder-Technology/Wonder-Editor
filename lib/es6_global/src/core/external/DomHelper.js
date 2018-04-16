'use strict';

import * as Pervasives   from "../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

var $$setTimeout = (
    function (func, time) {
      setTimeout(func, time)
    }
  );

var apply = ( function(dataArray, func) {
    return func.apply(null, dataArray);
  }
  );

function stopPropagation(e) {
  e.stopPropagation();
  return /* () */0;
}

function preventDefault(e) {
  return e.preventDefault();
}

function getRandomKey() {
  return Pervasives.string_of_float(Date.now() * Math.random());
}

function getAttribute(node, name) {
  return Js_primitive.null_to_opt(node.getAttribute(name));
}

var intEl = Pervasives.string_of_int;

function textEl(str) {
  return str;
}

export {
  $$setTimeout    ,
  apply           ,
  stopPropagation ,
  preventDefault  ,
  getRandomKey    ,
  getAttribute    ,
  intEl           ,
  textEl          ,
  
}
/* setTimeout Not a pure module */
