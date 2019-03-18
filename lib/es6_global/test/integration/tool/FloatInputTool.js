

import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as FloatInput$WonderEditor from "../../../src/core/atom_component/floatInput/FloatInput.js";

function reducer($staropt$star, $staropt$star$1, canBeZero, action, state, _) {
  var onBlurFunc = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : undefined;
  var onChangeFunc = $staropt$star$1 !== undefined ? Js_primitive.valFromOption($staropt$star$1) : undefined;
  return FloatInput$WonderEditor.reducer(/* tuple */[
              onChangeFunc,
              onBlurFunc
            ], canBeZero, action, state);
}

export {
  reducer ,
  
}
/* FloatInput-WonderEditor Not a pure module */
