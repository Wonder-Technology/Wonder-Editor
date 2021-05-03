

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ui/ReasonReactUtils.js";

function change($$event) {
  return /* Change */[$$event.target.value];
}

function triggerOnSubmitWithValue(value, onSubmitFunc) {
  if (onSubmitFunc !== undefined) {
    return Curry._1(onSubmitFunc, value);
  } else {
    return /* () */0;
  }
}

function submit(_event) {
  return /* Submit */1;
}

function showInput(_event) {
  return /* ShowInput */0;
}

var Method = /* module */[
  /* change */change,
  /* triggerOnSubmitWithValue */triggerOnSubmitWithValue,
  /* submit */submit,
  /* showInput */showInput
];

var component = ReasonReact.reducerComponent("FileInput");

function reducer(onSubmitFunc, action) {
  if (typeof action === "number") {
    if (action !== 0) {
      return (function (state) {
          var inputValue = state[/* inputValue */0].trim();
          if (inputValue === "") {
            return /* NoUpdate */0;
          } else {
            return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                        /* inputValue */inputValue,
                        /* isShowInput */state[/* isShowInput */1]
                      ], (function (_state) {
                          return triggerOnSubmitWithValue(inputValue, onSubmitFunc);
                        }));
          }
        });
    } else {
      return (function (state) {
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */state[/* inputValue */0],
                      /* isShowInput */!state[/* isShowInput */1]
                    ]]);
        });
    }
  } else {
    var text = action[0];
    return (function (state) {
        return /* Update */Block.__(0, [/* record */[
                    /* inputValue */text,
                    /* isShowInput */state[/* isShowInput */1]
                  ]]);
      });
  }
}

function render(buttonText, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  var match = state[/* isShowInput */1];
  return React.createElement("article", {
              className: "wonder-file-input"
            }, buttonText !== undefined ? React.createElement("button", {
                    onClick: (function (_e) {
                        return Curry._1(send, /* ShowInput */0);
                      })
                  }, DomHelper$WonderEditor.textEl(buttonText)) : null, match ? React.createElement(React.Fragment, undefined, React.createElement("textarea", {
                        className: "input-component file-input",
                        type: "text",
                        value: state[/* inputValue */0],
                        onChange: (function (_e) {
                            return Curry._1(send, /* Change */[_e.target.value]);
                          })
                      }), React.createElement("button", {
                        onClick: (function (_e) {
                            return Curry._1(send, /* Submit */1);
                          })
                      }, DomHelper$WonderEditor.textEl("submit"))) : null);
}

function make(buttonText, onSubmit, $staropt$star, $staropt$star$1, _children) {
  var isShowInput = $staropt$star !== undefined ? $staropt$star : false;
  var inputValue = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
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
              return render(buttonText, self);
            }),
          /* initialState */(function (param) {
              return /* record */[
                      /* inputValue */inputValue,
                      /* isShowInput */isShowInput
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(onSubmit, param);
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
