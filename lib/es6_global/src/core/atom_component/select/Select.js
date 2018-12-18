

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_format from "../../../../../../node_modules/bs-platform/lib/es6/caml_format.js";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ui/ReasonReactUtils.js";

function change($$event) {
  var inputVal = Caml_format.caml_int_of_string($$event.target.value);
  return /* Change */[inputVal];
}

function renderContent(options, state) {
  return options.map((function (param) {
                var value = param[/* value */1];
                return React.createElement("option", {
                            key: value,
                            value: String(param[/* key */0])
                          }, DomHelper$WonderEditor.textEl(value));
              }));
}

var Method = /* module */[
  /* change */change,
  /* renderContent */renderContent
];

var component = ReasonReact.reducerComponent("Select");

function reducer(onChange, action) {
  var selectedKey = action[0];
  return (function (state) {
      return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[/* selectedKey */selectedKey], (function (_state) {
                    return Curry._1(onChange, selectedKey);
                  }));
    });
}

function render(label, options, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  return React.createElement("article", {
              key: "Select",
              className: "inspector-item"
            }, label !== undefined ? React.createElement("div", {
                    className: "item-header"
                  }, React.createElement("span", {
                        className: ""
                      }, DomHelper$WonderEditor.textEl(label))) : null, React.createElement("div", {
                  className: "item-content"
                }, React.createElement("select", {
                      value: String(state[/* selectedKey */0]),
                      onChange: (function (e) {
                          return Curry._1(send, change(e));
                        })
                    }, renderContent(options, state))));
}

function make(label, options, selectedKey, onChange, _children) {
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
              return render(label, options, self);
            }),
          /* initialState */(function (param) {
              return /* record */[/* selectedKey */selectedKey];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(onChange, param);
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
