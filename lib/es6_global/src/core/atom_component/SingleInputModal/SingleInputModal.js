

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

var Method = /* module */[/* change */change];

var component = ReasonReact.reducerComponent("SingleInputModal");

function reducer(action, state) {
  return /* Update */Block.__(0, [/* record */[/* inputValue */action[0]]]);
}

function _renderContent(param) {
  var send = param[/* send */3];
  return React.createElement("div", {
              className: "modal-item-content"
            }, React.createElement("div", {
                  className: "content-field"
                }, React.createElement("div", {
                      className: "field-title"
                    }, DomHelper$WonderEditor.textEl("name:")), React.createElement("div", {
                      className: "field-content"
                    }, React.createElement("input", {
                          className: "input-component",
                          type: "text",
                          value: param[/* state */1][/* inputValue */0],
                          onChange: (function (_e) {
                              return Curry._1(send, change(_e));
                            })
                        }))));
}

function render(title, param, self) {
  var state = self[/* state */1];
  var submitFunc = param[1];
  var closeFunc = param[0];
  return React.createElement("article", {
              className: "wonder-singleInput-modal"
            }, React.createElement("div", {
                  className: "modal-item"
                }, React.createElement("div", {
                      className: "modal-item-header"
                    }, DomHelper$WonderEditor.textEl(title), React.createElement("img", {
                          src: "./public/img/close.png",
                          onClick: (function (_e) {
                              return Curry._1(closeFunc, /* () */0);
                            })
                        })), _renderContent(self), React.createElement("div", {
                      className: "modal-item-footer"
                    }, React.createElement("button", {
                          className: "footer-submit",
                          onClick: (function (_e) {
                              return Curry._1(submitFunc, state[/* inputValue */0]);
                            })
                        }, DomHelper$WonderEditor.textEl("Submit")))));
}

function make(closeFunc, title, submitFunc, defaultValue, _children) {
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
          /* render */(function (_self) {
              return render(title, /* tuple */[
                          closeFunc,
                          submitFunc
                        ], _self);
            }),
          /* initialState */(function (param) {
              if (defaultValue !== undefined) {
                return /* record */[/* inputValue */defaultValue];
              } else {
                return /* record */[/* inputValue */""];
              }
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  _renderContent ,
  render ,
  make ,
  
}
/* component Not a pure module */
