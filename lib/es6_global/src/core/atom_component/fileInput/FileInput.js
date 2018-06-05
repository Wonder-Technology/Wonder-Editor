

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../external/Css.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";

import '../../../../../../src/core/atom_component/fileInput/css/fileInput.css';

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
  param[/* state */1][/* inputField */0][0] = (value == null) ? /* None */0 : [value];
  return /* () */0;
}

function reducer(onSubmit, action) {
  if (typeof action === "number") {
    if (action !== 0) {
      return (function (state) {
          var inputValue = state[/* inputValue */1].trim();
          if (inputValue === "") {
            return /* NoUpdate */0;
          } else {
            return /* UpdateWithSideEffects */Block.__(2, [
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
        });
    } else {
      return (function (state) {
          return /* Update */Block.__(0, [/* record */[
                      /* inputField */state[/* inputField */0],
                      /* inputValue */state[/* inputValue */1],
                      /* isShowInput */!state[/* isShowInput */2]
                    ]]);
        });
    }
  } else {
    var text = action[0];
    return (function (state) {
        return /* Update */Block.__(0, [/* record */[
                    /* inputField */state[/* inputField */0],
                    /* inputValue */text,
                    /* isShowInput */state[/* isShowInput */2]
                  ]]);
      });
  }
}

function render(buttonText, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  var match = state[/* isShowInput */2];
  return React.createElement("article", {
              className: "wonder-file-input"
            }, buttonText ? React.createElement("button", {
                    onClick: (function () {
                        return Curry._1(send, /* ShowInput */0);
                      })
                  }, DomHelper$WonderEditor.textEl(buttonText[0])) : null, match ? React.createElement("div", undefined, React.createElement("textarea", {
                        ref: Curry._1(param[/* handle */0], setInputFiledRef),
                        className: "input-component file-input",
                        type: "text",
                        value: state[/* inputValue */1],
                        onChange: (function (_e) {
                            return Curry._1(send, /* Change */[_e.target.value]);
                          })
                      }), React.createElement("button", {
                        onClick: (function () {
                            return Curry._1(send, /* Submit */1);
                          })
                      }, DomHelper$WonderEditor.textEl("submit"))) : null);
}

function make(buttonText, onSubmit, _) {
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
          /* initialState */(function () {
              return /* record */[
                      /* inputField */[/* None */0],
                      /* inputValue */"",
                      /* isShowInput */false
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(onSubmit, param);
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

