'use strict';

import * as Block                  from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                  from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                  from "react";
import * as ReasonReact            from "../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor       from "../../../external/Css.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";

Css$WonderEditor.importCss("./css/floatInput.css");

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

function blur() {
  return /* Blur */0;
}

function triggerOnChange(value, onChange) {
  if (onChange) {
    return Curry._1(onChange[0], value);
  } else {
    return /* () */0;
  }
}

function triggerOnBlur(value, onBlur) {
  if (onBlur) {
    return Curry._1(onBlur[0], value);
  } else {
    return /* () */0;
  }
}

var Method = /* module */[
  /* change */change,
  /* blur */blur,
  /* triggerOnChange */triggerOnChange,
  /* triggerOnBlur */triggerOnBlur
];

var component = ReasonReact.reducerComponent("FloatInput");

function setInputFiledRef(value, param) {
  param[/* state */4][/* inputField */0][0] = value === null ? /* None */0 : [value];
  return /* () */0;
}

function reducer(onChange, onBlur, action, state) {
  if (action) {
    var value = action[0];
    return /* UpdateWithSideEffects */Block.__(3, [
              /* record */[
                /* inputField */state[/* inputField */0],
                /* inputValue */value
              ],
              (function () {
                  return triggerOnChange(value, onChange);
                })
            ]);
  } else {
    triggerOnBlur(state[/* inputValue */1], onBlur);
    return /* NoUpdate */0;
  }
}

function render(label, param) {
  var reduce = param[/* reduce */3];
  return React.createElement("article", {
              className: "wonder-float-input"
            }, label ? React.createElement("span", {
                    className: "component-label"
                  }, DomHelper$WonderEditor.textEl(label[0] + " : ")) : null, React.createElement("input", {
                  ref: Curry._1(param[/* handle */0], setInputFiledRef),
                  className: "input-component float-input",
                  type: "text",
                  value: param[/* state */4][/* inputValue */1],
                  onBlur: Curry._1(reduce, blur),
                  onChange: Curry._1(reduce, change)
                }));
}

function make(defaultValue, label, onChange, onBlur, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(label, self);
    });
  newrecord[/* initialState */10] = (function () {
      if (defaultValue) {
        return /* record */[
                /* inputField */[/* None */0],
                /* inputValue */defaultValue[0]
              ];
      } else {
        return /* record */[
                /* inputField */[/* None */0],
                /* inputValue */""
              ];
      }
    });
  newrecord[/* reducer */12] = (function (param, param$1) {
      return reducer(onChange, onBlur, param, param$1);
    });
  return newrecord;
}

export {
  Method           ,
  component        ,
  setInputFiledRef ,
  reducer          ,
  render           ,
  make             ,
  
}
/*  Not a pure module */
