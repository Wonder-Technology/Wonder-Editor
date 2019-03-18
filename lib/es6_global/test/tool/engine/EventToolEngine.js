

import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as CreateCustomEventEngineService$WonderEditor from "../../../src/service/state/engine/event/CreateCustomEventEngineService.js";

function buildCustomEvent($staropt$star, $staropt$star$1, param) {
  var userData = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var eventName = $staropt$star$1 !== undefined ? $staropt$star$1 : "custom event";
  return CreateCustomEventEngineService$WonderEditor.create(eventName, userData);
}

export {
  buildCustomEvent ,
  
}
/* No side effect */
