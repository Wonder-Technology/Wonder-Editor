'use strict';

import * as Pervasives   from "../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Js_primitive from "../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

var apply = ( function(dataArray, func) {
    return func.apply(null, dataArray);
  }
  );

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
  apply        ,
  getRandomKey ,
  getAttribute ,
  intEl        ,
  textEl       ,
  
}
/* apply Not a pure module */
