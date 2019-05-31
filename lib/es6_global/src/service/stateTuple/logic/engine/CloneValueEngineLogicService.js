

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";

function cloneValueByGetValueFunc(unsafeGetValueFunc, setValueFunc, targetComponent, param, targetEngineState) {
  return Curry._3(setValueFunc, Curry._2(unsafeGetValueFunc, param[0], param[1]), targetComponent, targetEngineState);
}

function cloneValueByGetOptionValueFunc(getValueFunc, setValueFunc, targetComponent, param, targetEngineState) {
  var match = Curry._2(getValueFunc, param[0], param[1]);
  if (match !== undefined) {
    return Curry._3(setValueFunc, Caml_option.valFromOption(match), targetComponent, targetEngineState);
  } else {
    return targetEngineState;
  }
}

export {
  cloneValueByGetValueFunc ,
  cloneValueByGetOptionValueFunc ,
  
}
/* No side effect */
