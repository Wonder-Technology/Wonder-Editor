'use strict';

import * as Block                  from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                  from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                  from "react";
import * as ReasonReact            from "../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor       from "../../../external/Css.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";

Css$WonderEditor.importCss("./css/fileInput.css");

function change($$event) {
  return /* Change */[$$event.target.value];
}

function triggerOnSubmitWithValue(value, onSubmit) {
  if (onSubmit) {
    return Curry._1(onSubmit[0], value);
  } else {
    return /* () */0;
  }
}

function submit() {
  return /* Submit */1;
}

function showInput() {
  return /* ShowInput */0;
}

var Method = /* module */[
  /* change */change,
  /* triggerOnSubmitWithValue */triggerOnSubmitWithValue,
  /* submit */submit,
  /* showInput */showInput
];

var component = ReasonReact.reducerComponent("FileInput");

function setInputFiledRef(value, param) {
  param[/* state */4][/* inputField */0][0] = value === null ? /* None */0 : [value];
  return /* () */0;
}

function reducer(onSubmit, action, state) {
  if (typeof action === "number") {
    if (action !== 0) {
      var inputValue = state[/* inputValue */1].trim();
      if (inputValue === "") {
        return /* NoUpdate */0;
      } else {
        return /* UpdateWithSideEffects */Block.__(3, [
                  /* record */[
                    /* inputField */state[/* inputField */0],
                    /* inputValue */inputValue,
                    /* isShowInput */state[/* isShowInput */2]
                  ],
                  (function () {
                      return triggerOnSubmitWithValue(inputValue, onSubmit);
                    })
                ]);
      }
    } else {
      return /* Update */Block.__(0, [/* record */[
                  /* inputField */state[/* inputField */0],
                  /* inputValue */state[/* inputValue */1],
                  /* isShowInput */1 - state[/* isShowInput */2]
                ]]);
    }
  } else {
    return /* Update */Block.__(0, [/* record */[
                /* inputField */state[/* inputField */0],
                /* inputValue */action[0],
                /* isShowInput */state[/* isShowInput */2]
              ]]);
  }
}

function render(buttonText, param) {
  var state = param[/* state */4];
  var reduce = param[/* reduce */3];
  var match = state[/* isShowInput */2];
  return React.createElement("article", {
              className: "wonder-file-input"
            }, buttonText ? React.createElement("button", {
                    onClick: Curry._1(reduce, showInput)
                  }, DomHelper$WonderEditor.textEl(buttonText[0])) : null, match !== 0 ? React.createElement("div", undefined, React.createElement("textarea", {
                        ref: Curry._1(param[/* handle */0], setInputFiledRef),
                        className: "input-component file-input",
                        type: "text",
                        value: state[/* inputValue */1],
                        onChange: Curry._1(reduce, change)
                      }), React.createElement("button", {
                        onClick: Curry._1(reduce, submit)
                      }, DomHelper$WonderEditor.textEl("submit"))) : null);
}

function make(buttonText, onSubmit, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(buttonText, self);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* inputField */[/* None */0],
              /* inputValue */"",
              /* isShowInput : false */0
            ];
    });
  newrecord[/* reducer */12] = (function (param, param$1) {
      return reducer(onSubmit, param, param$1);
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
