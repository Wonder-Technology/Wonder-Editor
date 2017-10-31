'use strict';

import * as Pervasives   from "../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

function fromNow(unixtime) {
  var delta = (Date.now() / 1000 | 0) - unixtime | 0;
  if (delta < 3600) {
    return Pervasives.string_of_int(delta / 60 | 0) + "minutes age";
  } else if (delta < 86400) {
    return Pervasives.string_of_int(delta / 3600 | 0) + "hours age";
  } else {
    return Pervasives.string_of_int(delta / 86400 | 0) + "days age";
  }
}

function getAttribute(node, name) {
  return Js_primitive.null_to_opt(node.getAttribute(name));
}

var intEl = Pervasives.string_of_int;

function textEl(str) {
  return str;
}

export {
  fromNow      ,
  getAttribute ,
  intEl        ,
  textEl       ,
  
}
/* No side effect */
