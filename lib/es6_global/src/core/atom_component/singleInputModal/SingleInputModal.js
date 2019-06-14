

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

function _renderInput(param, inputText) {
  var send = param[/* send */3];
  return React.createElement("div", {
              className: "content-field"
            }, React.createElement("div", {
                  className: "field-title"
                }, DomHelper$WonderEditor.textEl(inputText)), React.createElement("div", {
                  className: "field-content"
                }, React.createElement("input", {
                      className: "input-component",
                      type: "text",
                      value: param[/* state */1][/* inputValue */0],
                      onChange: (function (_e) {
                          return Curry._1(send, change(_e));
                        })
                    })));
}

function render(title, inputText, content, param, self) {
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
                        })), React.createElement("div", {
                      className: "modal-item-content"
                    }, _renderInput(self, inputText), content), React.createElement("div", {
                      className: "modal-item-footer"
                    }, React.createElement("button", {
                          className: "footer-submit",
                          onClick: (function (_e) {
                              return Curry._1(submitFunc, state[/* inputValue */0]);
                            })
                        }, DomHelper$WonderEditor.textEl("Submit")))));
}

function make(closeFunc, title, inputText, $staropt$star, submitFunc, defaultValue, _children) {
  var content = $staropt$star !== undefined ? $staropt$star : /* array */[];
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
              return render(title, inputText, content, /* tuple */[
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
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  _renderInput ,
  render ,
  make ,
  
}
/* component Not a pure module */
