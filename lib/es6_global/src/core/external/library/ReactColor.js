

import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Js_null_undefined from "../../../../../../node_modules/bs-platform/lib/es6/js_null_undefined.js";
import * as Sketch from "react-color/lib/components/sketch/Sketch";

function make(color, onChange, children) {
  return ReasonReact.wrapJsForReason(Sketch.default, {
              color: Js_null_undefined.fromOption(color),
              onChange: Js_null_undefined.fromOption(onChange)
            }, children);
}

var Sketch$1 = /* module */[/* make */make];

export {
  Sketch$1 as Sketch,
  
}
/* ReasonReact Not a pure module */
