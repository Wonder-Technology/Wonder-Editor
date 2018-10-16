

import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Js_null_undefined from "../../../../../../node_modules/bs-platform/lib/es6/js_null_undefined.js";
import * as Index from "antd/lib/switch/index";

var Message = /* module */[];

function make(checked, onChange, children) {
  return ReasonReact.wrapJsForReason(Index.default, {
              checked: Js_null_undefined.fromOption(checked),
              onChange: Js_null_undefined.fromOption(onChange)
            }, children);
}

var Switch = /* module */[/* make */make];

export {
  Message ,
  Switch ,
  
}
/* ReasonReact Not a pure module */
