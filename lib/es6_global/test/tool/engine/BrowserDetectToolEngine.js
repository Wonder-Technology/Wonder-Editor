

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";

function setChrome(param) {
  var state = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* browserDetectRecord */39] = /* record */[/* browser : Chrome */0];
  StateEngineService$WonderEditor.setState(newrecord);
  return /* () */0;
}

export {
  setChrome ,
  
}
/* StateEngineService-WonderEditor Not a pure module */
