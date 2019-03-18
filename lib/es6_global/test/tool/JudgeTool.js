

import * as Caml_obj from "../../../../node_modules/bs-platform/lib/es6/caml_obj.js";

var isEqual = Caml_obj.caml_equal;

function isSame(a, b) {
  return a === b;
}

export {
  isEqual ,
  isSame ,
  
}
/* No side effect */
