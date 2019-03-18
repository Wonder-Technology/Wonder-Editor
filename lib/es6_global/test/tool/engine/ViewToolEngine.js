

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ViewService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/device/ViewService.js";

function setCanvas(canvas, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* viewRecord */8] = ViewService$Wonderjs.setCanvas(canvas, state[/* viewRecord */8]);
  return newrecord;
}

export {
  setCanvas ,
  
}
/* ViewService-Wonderjs Not a pure module */
