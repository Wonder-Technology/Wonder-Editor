

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_format from "../../../../../../node_modules/bs-platform/lib/es6/caml_format.js";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../external/Css.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ui/ReasonReactUtils.js";

Css$WonderEditor.importCss("./css/floatInput.css");

function change($$event) {
  var inputVal = $$event.target.value;
  switch (inputVal) {
    case "" : 
        return /* Change */[/* Some */[""]];
    case "-" : 
        return /* Change */[/* Some */["-"]];
    default:
      var match = (/^-?(0|[1-9][0-9]*)(\.[0-9]{0,6})?$/).test(inputVal);
      if (match) {
        return /* Change */[/* Some */[inputVal]];
      } else {
        return /* Change */[/* None */0];
      }
  }
}

function triggerOnChange(value, onChangeFunc) {
  if (onChangeFunc) {
    return Curry._1(onChangeFunc[0], Caml_format.caml_float_of_string(value));
  } else {
    return /* () */0;
  }
}

function triggerOnBlur(value, onBlurFunc) {
  if (onBlurFunc) {
    return Curry._1(onBlurFunc[0], Caml_format.caml_float_of_string(value));
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

function reducer(onChangeFunc, onBlurFunc, action, state) {
  if (action) {
    var value = action[0];
    if (value) {
      var value$1 = value[0];
      switch (value$1) {
        case "" : 
            return /* Update */Block.__(0, [/* record */[/* inputValue : None */0]]);
        case "-" : 
            return /* Update */Block.__(0, [/* record */[/* inputValue : Some */["-"]]]);
        default:
          return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[/* inputValue : Some */[value$1]], (function () {
                        return triggerOnChange(value$1, onChangeFunc);
                      }));
      }
    } else {
      return /* NoUpdate */0;
    }
  } else {
    var match = state[/* inputValue */0];
    var exit = 0;
    if (match) {
      var value$2 = match[0];
      switch (value$2) {
        case "" : 
        case "-" : 
            exit = 1;
            break;
        default:
          return ReasonReactUtils$WonderEditor.sideEffects((function () {
                        return triggerOnBlur(value$2, onBlurFunc);
                      }));
      }
    } else {
      exit = 1;
    }
    if (exit === 1) {
      return ReasonReactUtils$WonderEditor.sideEffects((function () {
                    return triggerOnBlur("0", onBlurFunc);
                  }));
    }
    
  }
}

function render(label, _, param) {
  var send = param[/* send */3];
  var match = param[/* state */1][/* inputValue */0];
  return React.createElement("article", {
              className: "wonder-float-input"
            }, label ? React.createElement("span", {
                    className: "component-label"
                  }, DomHelper$WonderEditor.textEl(label[0] + " : ")) : null, React.createElement("input", {
                  className: "input-component float-input",
                  type: "text",
                  value: match ? match[0] : "",
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
              return render(label, onBlur, self);
            }),
          /* initialState */(function () {
              if (defaultValue) {
                return /* record */[/* inputValue : Some */[defaultValue[0]]];
              } else {
                return /* record */[/* inputValue : Some */["0"]];
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
  reducer ,
  render ,
  make ,
  
}
/*  Not a pure module */
