

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ui/ReasonReactUtils.js";

function changeState(_event) {
  return /* ChangeState */0;
}

var Method = /* module */[/* changeState */changeState];

var component = ReasonReact.reducerComponent("Switch");

function reducer(openFunc, closeFunc, action) {
  return (function (state) {
      var match = state[/* isOpen */0];
      if (match) {
        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[/* isOpen */!state[/* isOpen */0]], (function (_state) {
                      return Curry._1(closeFunc, /* () */0);
                    }));
      } else {
        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[/* isOpen */!state[/* isOpen */0]], (function (_state) {
                      return Curry._1(openFunc, /* () */0);
                    }));
      }
    });
}

function render(openText, closeText, param) {
  var send = param[/* send */3];
  var match = param[/* state */1][/* isOpen */0];
  return React.createElement("article", {
              className: "wonder-switch"
            }, match ? React.createElement("button", {
                    onClick: (function (_e) {
                        return Curry._1(send, /* ChangeState */0);
                      })
                  }, DomHelper$WonderEditor.textEl(closeText)) : React.createElement("button", {
                    onClick: (function (_e) {
                        return Curry._1(send, /* ChangeState */0);
                      })
                  }, DomHelper$WonderEditor.textEl(openText)));
}

function make(openText, openFunc, closeText, closeFunc, isOpen, _children) {
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
          /* initialState */(function (param) {
              return /* record */[/* isOpen */isOpen];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(openFunc, closeFunc, param);
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
