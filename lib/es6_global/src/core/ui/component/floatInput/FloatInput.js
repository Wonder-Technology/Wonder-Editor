'use strict';

import * as Block                  from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                  from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                  from "react";
import * as Caml_format            from "../../../../../../../node_modules/bs-platform/lib/es6/caml_format.js";
import * as ReasonReact            from "../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor       from "../../../external/Css.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";

import '../../../../../../../src/core/ui/component/floatInput/css/floatInput.css';

function change($$event) {
  var inputVal = $$event.target.value;
  switch (inputVal) {
    case "" : 
        return /* Change */[/* Some */[""]];
    case "-" : 
        return /* Change */[/* Some */["-"]];
    default:
      var match = +(/^-?(0|[1-9][0-9]*)(\.[0-9]{0,6})?$/).test(inputVal);
      if (match !== 0) {
        return /* Change */[/* Some */[inputVal]];
      } else {
        return /* Change */[/* None */0];
      }
  }
}

function triggerOnChange(value, onChange) {
  if (onChange) {
    return Curry._1(onChange[0], Caml_format.caml_float_of_string(value));
  } else {
    return /* () */0;
  }
}

function triggerOnBlur(onBlur, _) {
  if (onBlur) {
    return Curry._1(onBlur[0], /* () */0);
  } else {
    return /* () */0;
  }
}

var Method = /* module */[
  /* change */change,
  /* triggerOnChange */triggerOnChange,
  /* triggerOnBlur */triggerOnBlur
];

var component = ReasonReact.reducerComponent("FloatInput");

function setInputFiledRef(value, param) {
  param[/* state */4][/* inputField */0][0] = value === null ? /* None */0 : [value];
  return /* () */0;
}

function reducer(onChange, action, state) {
  var value = action[0];
  if (value) {
    var value$1 = value[0];
    switch (value$1) {
      case "" : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputField */state[/* inputField */0],
                      /* inputValue : None */0
                    ]]);
      case "-" : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputField */state[/* inputField */0],
                      /* inputValue : Some */["-"]
                    ]]);
      default:
        return /* UpdateWithSideEffects */Block.__(3, [
                  /* record */[
                    /* inputField */state[/* inputField */0],
                    /* inputValue : Some */[value$1]
                  ],
                  (function () {
                      return triggerOnChange(value$1, onChange);
                    })
                ]);
    }
  } else {
    return /* NoUpdate */0;
  }
}

function render(label, onBlur, param) {
  var match = param[/* state */4][/* inputValue */1];
  return React.createElement("article", {
              className: "wonder-float-input"
            }, label ? React.createElement("span", {
                    className: "component-label"
                  }, DomHelper$WonderEditor.textEl(label[0] + " : ")) : null, React.createElement("input", {
                  ref: Curry._1(param[/* handle */0], setInputFiledRef),
                  className: "input-component float-input",
                  type: "text",
                  value: match ? match[0] : "",
                  onBlur: (function (param) {
                      return triggerOnBlur(onBlur, param);
                    }),
                  onChange: Curry._1(param[/* reduce */3], change)
                }));
}

function make(defaultValue, label, onChange, onBlur, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(label, onBlur, self);
    });
  newrecord[/* initialState */10] = (function () {
      if (defaultValue) {
        return /* record */[
                /* inputField */[/* None */0],
                /* inputValue : Some */[defaultValue[0]]
              ];
      } else {
        return /* record */[
                /* inputField */[/* None */0],
                /* inputValue : Some */["0"]
              ];
      }
    });
  newrecord[/* reducer */12] = (function (param, param$1) {
      return reducer(onChange, param, param$1);
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

