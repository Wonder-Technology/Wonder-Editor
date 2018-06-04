

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";

function changeState() {
  return /* ChangeState */0;
}

var Method = /* module */[/* changeState */changeState];

var component = ReasonReact.reducerComponent("Switch");

function reducer(openFunc, closeFunc, _, state) {
  var match = state[/* isOpen */0];
  if (match) {
    return /* UpdateWithSideEffects */Block.__(2, [
              /* record */[/* isOpen */!state[/* isOpen */0]],
              (function () {
                  return Curry._1(closeFunc, /* () */0);
                })
            ]);
  } else {
    return /* UpdateWithSideEffects */Block.__(2, [
              /* record */[/* isOpen */!state[/* isOpen */0]],
              (function () {
                  return Curry._1(openFunc, /* () */0);
                })
            ]);
  }
}

function render(openText, closeText, param) {
  var send = param[/* send */3];
  var match = param[/* state */1][/* isOpen */0];
  return React.createElement("article", {
              className: "wonder-switch"
            }, match ? React.createElement("button", {
                    onClick: (function () {
                        return Curry._1(send, /* ChangeState */0);
                      })
                  }, DomHelper$WonderEditor.textEl(closeText)) : React.createElement("button", {
                    onClick: (function () {
                        return Curry._1(send, /* ChangeState */0);
                      })
                  }, DomHelper$WonderEditor.textEl(openText)));
}

function make(openText, openFunc, closeText, closeFunc, isOpen, _) {
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
              return render(openText, closeText, self);
            }),
          /* initialState */(function () {
              return /* record */[/* isOpen */isOpen];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(openFunc, closeFunc, param, param$1);
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
/* component Not a pure module */
