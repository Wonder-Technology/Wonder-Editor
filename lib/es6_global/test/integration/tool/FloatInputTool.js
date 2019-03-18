

import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as FloatInput$WonderEditor from "../../../src/core/atom_component/floatInput/FloatInput.js";

function reducer($staropt$star, $staropt$star$1, $staropt$star$2, action, state, param) {
  var onBlurFunc = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var onChangeFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  var canBeZero = $staropt$star$2 !== undefined ? $staropt$star$2 : false;
  return FloatInput$WonderEditor.reducer(/* tuple */[
              onChangeFunc,
              onBlurFunc
            ], canBeZero, action, state);
}

function buildState($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var canBeZero = $staropt$star !== undefined ? $staropt$star : false;
  var originValue = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  var inputValue = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : "0.0";
  var isDragStart = $staropt$star$3 !== undefined ? $staropt$star$3 : false;
  return /* record */[
          /* inputValue */inputValue,
          /* originValue */originValue,
          /* isDragStart */isDragStart,
          /* canBeZero */canBeZero
        ];
}

export {
  reducer ,
  buildState ,
  
}
/* FloatInput-WonderEditor Not a pure module */
