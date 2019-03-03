

import * as Caml_obj from "../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";

function isValueEqual(kind, sourceValue, targetValue) {
  return Caml_obj.caml_equal(sourceValue, targetValue);
}

export {
  isValueEqual ,
  
}
/* No side effect */
