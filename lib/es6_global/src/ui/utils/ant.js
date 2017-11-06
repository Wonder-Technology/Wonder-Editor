'use strict';

import * as Curry                          from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_boolean                     from "../../../../../node_modules/bs-platform/lib/es6/js_boolean.js";
import * as ReasonReact                    from "../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Antd$slashlib$slashbutton      from "antd/lib/button";
import * as Js_null_undefined              from "../../../../../node_modules/bs-platform/lib/es6/js_null_undefined.js";
import * as Antd$slashlib$slashinputNumber from "antd/lib/input-number";

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

function make$1(defaultValue, disabled, max, min, precision, size, step, value, onBlur, onClick, onContextMenu, onDoubleClick, onDrag, onDragEnd, onDragEnter, onDragExit, onDragLeave, onDragOver, onDragStart, onDrop, onFocus, onKeyDown, onKeyPress, onKeyUp, onMouseDown, onMouseEnter, onMouseLeave, onMouseMove, onMouseOut, onMouseOver, onMouseUp, onTouchCancel, onTouchEnd, onTouchMove, onTouchStart, onChange, children) {
  return ReasonReact.wrapJsForReason(Antd$slashlib$slashinputNumber.default, {
              defaultValue: Js_null_undefined.from_opt(defaultValue),
              disabled: Js_null_undefined.from_opt(optionMap(Js_boolean.to_js_boolean, disabled)),
              max: Js_null_undefined.from_opt(max),
              min: Js_null_undefined.from_opt(min),
              precision: Js_null_undefined.from_opt(precision),
              size: Js_null_undefined.from_opt(size),
              step: Js_null_undefined.from_opt(step),
              value: Js_null_undefined.from_opt(value),
              onBlur: Js_null_undefined.from_opt(onBlur),
              onClick: Js_null_undefined.from_opt(onClick),
              onContextMenu: Js_null_undefined.from_opt(onContextMenu),
              onDoubleClick: Js_null_undefined.from_opt(onDoubleClick),
              onDrag: Js_null_undefined.from_opt(onDrag),
              onDragEnd: Js_null_undefined.from_opt(onDragEnd),
              onDragEnter: Js_null_undefined.from_opt(onDragEnter),
              onDragExit: Js_null_undefined.from_opt(onDragExit),
              onDragLeave: Js_null_undefined.from_opt(onDragLeave),
              onDragOver: Js_null_undefined.from_opt(onDragOver),
              onDragStart: Js_null_undefined.from_opt(onDragStart),
              onDrop: Js_null_undefined.from_opt(onDrop),
              onFocus: Js_null_undefined.from_opt(onFocus),
              onKeyDown: Js_null_undefined.from_opt(onKeyDown),
              onKeyPress: Js_null_undefined.from_opt(onKeyPress),
              onKeyUp: Js_null_undefined.from_opt(onKeyUp),
              onMouseDown: Js_null_undefined.from_opt(onMouseDown),
              onMouseEnter: Js_null_undefined.from_opt(onMouseEnter),
              onMouseLeave: Js_null_undefined.from_opt(onMouseLeave),
              onMouseMove: Js_null_undefined.from_opt(onMouseMove),
              onMouseOut: Js_null_undefined.from_opt(onMouseOut),
              onMouseOver: Js_null_undefined.from_opt(onMouseOver),
              onMouseUp: Js_null_undefined.from_opt(onMouseUp),
              onTouchCancel: Js_null_undefined.from_opt(onTouchCancel),
              onTouchEnd: Js_null_undefined.from_opt(onTouchEnd),
              onTouchMove: Js_null_undefined.from_opt(onTouchMove),
              onTouchStart: Js_null_undefined.from_opt(onTouchStart),
              onChange: Js_null_undefined.from_opt(onChange)
            }, children);
}

var InputNumber = /* module */[/* make */make$1];

export {
  Button      ,
  InputNumber ,
  
}
/* ReasonReact Not a pure module */
