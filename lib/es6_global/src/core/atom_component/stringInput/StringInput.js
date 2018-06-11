

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../external/Css.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ui/ReasonReactUtils.js";

Css$WonderEditor.importCss("./css/stringInput.css");

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

function blur() {
  return /* Blur */0;
}

function triggerOnChange(value, onChangeFunc) {
  if (onChangeFunc) {
    return Curry._1(onChangeFunc[0], value);
  } else {
    return /* () */0;
  }
}

function triggerOnBlur(value, onBlurFunc) {
  if (onBlurFunc) {
    return Curry._1(onBlurFunc[0], value);
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

var component = ReasonReact.reducerComponent("StringInput");

function setInputFiledRef(value, param) {
  param[/* state */1][/* inputField */0][0] = (value == null) ? /* None */0 : [value];
  return /* () */0;
}

function reducer(onChangeFunc, onBlurFunc, action, state) {
  if (action) {
    var value = action[0];
    return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                /* inputField */state[/* inputField */0],
                /* inputValue */value
              ], (function () {
                  return triggerOnChange(value, onChangeFunc);
                }));
  } else {
    triggerOnBlur(state[/* inputValue */1], onBlurFunc);
    return /* NoUpdate */0;
  }
}

function render(label, param) {
  var send = param[/* send */3];
  return React.createElement("article", {
              className: "wonder-string-input"
            }, label ? React.createElement("span", {
                    className: "component-label"
                  }, DomHelper$WonderEditor.textEl(label[0] + " : ")) : null, React.createElement("input", {
                  ref: Curry._1(param[/* handle */0], setInputFiledRef),
                  className: "input-component float-input",
                  type: "text",
                  value: param[/* state */1][/* inputValue */1],
                  onBlur: (function () {
                      return Curry._1(send, /* Blur */0);
                    }),
                  onChange: (function (_e) {
                      return Curry._1(send, change(_e));
                    })
                }));
}

function make(defaultValue, label, onChange, onBlur, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(label, self);
            }),
          /* initialState */(function () {
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
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(onChange, onBlur, param, param$1);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  setInputFiledRef ,
  reducer ,
  render ,
  make ,
  
}
/*  Not a pure module */
