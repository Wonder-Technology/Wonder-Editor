

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../external/Css.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ui/ReasonReactUtils.js";

import '../../../../../../src/core/atom_component/stringInput/css/stringInput.css';

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

function reducer(param, isNull, action, state) {
  var onBlurFunc = param[1];
  var onChangeFunc = param[0];
  if (action) {
    var value = action[0];
    return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                /* inputValue */value,
                /* originalName */state[/* originalName */1]
              ], (function () {
                  return triggerOnChange(value, onChangeFunc);
                }));
  } else if (isNull) {
    if (isNull[0]) {
      triggerOnBlur(state[/* inputValue */0], onBlurFunc);
      return /* NoUpdate */0;
    } else {
      var value$1 = state[/* inputValue */0];
      if (value$1 === "") {
        return /* Update */Block.__(0, [/* record */[
                    /* inputValue */state[/* originalName */1],
                    /* originalName */state[/* originalName */1]
                  ]]);
      } else {
        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                    /* inputValue */state[/* inputValue */0],
                    /* originalName */value$1
                  ], (function () {
                      return triggerOnBlur(state[/* inputValue */0], onBlurFunc);
                    }));
      }
    }
  } else {
    triggerOnBlur(state[/* inputValue */0], onBlurFunc);
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
                  className: "input-component float-input",
                  type: "text",
                  value: param[/* state */1][/* inputValue */0],
                  onBlur: (function () {
                      return Curry._1(send, /* Blur */0);
                    }),
                  onChange: (function (_e) {
                      return Curry._1(send, change(_e));
                    })
                }));
}

function make(defaultValue, label, onChange, onBlur, isNull, _) {
  var partial_arg = /* tuple */[
    onChange,
    onBlur
  ];
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
                var value = defaultValue[0];
                return /* record */[
                        /* inputValue */value,
                        /* originalName */value
                      ];
              } else {
                return /* record */[
                        /* inputValue */"",
                        /* originalName */""
                      ];
              }
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, isNull, param, param$1);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  make ,
  
}
/*  Not a pure module */

