

import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as FloatInput$WonderEditor from "../../../src/core/atom_component/floatInput/FloatInput.js";

function reducer($staropt$star, $staropt$star$1, canBeZero, action, state, param) {
  var onBlurFunc = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var onChangeFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  return FloatInput$WonderEditor.reducer(/* tuple */[
              onChangeFunc,
              onBlurFunc
            ], canBeZero, action, state);
}

export {
  reducer ,
  
}
/* FloatInput-WonderEditor Not a pure module */
