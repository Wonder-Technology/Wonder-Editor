'use strict';

import * as Block               from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry               from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React               from "react";
import * as ReasonReact         from "../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as CamlinternalOO      from "../../../../../../node_modules/bs-platform/lib/es6/camlinternalOO.js";
import * as UiTool$WonderEditor from "../../utils/uiTool.js";

var class_tables = [
  0,
  0,
  0
];

function importCss() {
  if (!class_tables[0]) {
    var $$class = CamlinternalOO.create_table(0);
    var env_init = function () {
      return CamlinternalOO.create_object_opt(0, $$class);
    };
    CamlinternalOO.init_class($$class);
    class_tables[0] = env_init;
  }
  return Curry._1(class_tables[0], 0);
}

importCss("./numberInput.scss");

var component = ReasonReact.reducerComponent("NumberInput");

function setInputFiledRef(value, param) {
  param[/* state */4][/* inputField */0][0] = value === null ? /* None */0 : [value];
  return /* () */0;
}

function make(defaultValue, label, _) {
  var change = function ($$event) {
    var inputVal = $$event.target.value;
    if (inputVal === "") {
      return /* Change */[/* Some */[""]];
    } else {
      var value = inputVal;
      var regex = (/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/);
      var match = regex.exec(value);
      if (match !== null) {
        return /* Change */[/* Some */[value]];
      } else {
        return /* Change */[/* None */0];
      }
    }
  };
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (param) {
      if (defaultValue) {
        return /* Update */Block.__(0, [/* record */[
                    /* inputField */param[/* state */4][/* inputField */0],
                    /* inputValue : Some */[defaultValue[0]]
                  ]]);
      } else {
        return /* NoUpdate */0;
      }
    });
  newrecord[/* render */9] = (function (param) {
      var labelText = label ? React.createElement("span", {
              className: "number-label"
            }, UiTool$WonderEditor.textEl(label[0] + " : ")) : null;
      var match = param[/* state */4][/* inputValue */1];
      return React.createElement("div", {
                  className: "number-input"
                }, labelText, React.createElement("input", {
                      ref: Curry._1(param[/* handle */0], setInputFiledRef),
                      className: "ant-input number-input-input",
                      type: "text",
                      value: match ? match[0] : "",
                      onChange: Curry._1(param[/* reduce */3], change)
                    }));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* inputField */[/* None */0],
              /* inputValue : Some */["0"]
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      var value = action[0];
      if (value) {
        var value_ = value[0];
        if (value_ === "") {
          return /* Update */Block.__(0, [/* record */[
                      /* inputField */state[/* inputField */0],
                      /* inputValue : None */0
                    ]]);
        } else {
          return /* Update */Block.__(0, [/* record */[
                      /* inputField */state[/* inputField */0],
                      /* inputValue : Some */[value_]
                    ]]);
        }
      } else {
        return /* NoUpdate */0;
      }
    });
  return newrecord;
}

export {
  importCss        ,
  component        ,
  setInputFiledRef ,
  make             ,
  
}
/*  Not a pure module */
