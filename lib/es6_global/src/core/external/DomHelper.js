'use strict';

import * as Pervasives from "../../../../../node_modules/bs-platform/lib/es6/pervasives.js";

var $$setTimeout = (
    function (func, time) {
      setTimeout(func, time)
    }
  );

var apply = (
    function(dataArray, func) {
      return func.apply(null, dataArray);
    }
  );

var deleteKeyInDict = (function (key,dict) {
    delete dict[key];
    return 0
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

var intEl = Pervasives.string_of_int;

function textEl(str) {
  return str;
}

export {
  $$setTimeout    ,
  apply           ,
  deleteKeyInDict ,
  stopPropagation ,
  preventDefault  ,
  getRandomKey    ,
  intEl           ,
  textEl          ,
  
}
/* setTimeout Not a pure module */
