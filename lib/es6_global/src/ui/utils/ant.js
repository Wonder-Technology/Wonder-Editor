'use strict';

import * as Curry                     from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_boolean                from "../../../../../node_modules/bs-platform/lib/es6/js_boolean.js";
import * as ReasonReact               from "../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Antd$slashlib$slashbutton from "antd/lib/button";
import * as Js_null_undefined         from "../../../../../node_modules/bs-platform/lib/es6/js_null_undefined.js";

function optionMap(fn, option) {
  if (option) {
    return /* Some */[Curry._1(fn, option[0])];
  } else {
    return /* None */0;
  }
}

function make(ghost, htmlType, icon, loading, shape, size, onClick, _type, children) {
  return ReasonReact.wrapJsForReason(Antd$slashlib$slashbutton.default, {
              ghost: Js_null_undefined.from_opt(optionMap(Js_boolean.to_js_boolean, ghost)),
              htmlType: Js_null_undefined.from_opt(htmlType),
              icon: Js_null_undefined.from_opt(icon),
              loading: Js_null_undefined.from_opt(optionMap(Js_boolean.to_js_boolean, loading)),
              shape: Js_null_undefined.from_opt(shape),
              size: Js_null_undefined.from_opt(size),
              onClick: Js_null_undefined.from_opt(onClick),
              type: Js_null_undefined.from_opt(_type)
            }, children);
}

var Button = /* module */[/* make */make];

export {
  Button ,
  
}
/* ReasonReact Not a pure module */
