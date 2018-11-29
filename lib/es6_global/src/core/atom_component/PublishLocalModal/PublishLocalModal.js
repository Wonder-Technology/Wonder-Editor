

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";

function changeName($$event) {
  var inputVal = $$event.target.value;
  return /* ChangeName */Block.__(0, [inputVal]);
}

function changeUseWorker($$event) {
  var checked = $$event.target.checked;
  return /* ChangeUseWorker */Block.__(1, [checked]);
}

var Method = /* module */[
  /* changeName */changeName,
  /* changeUseWorker */changeUseWorker
];

var component = ReasonReact.reducerComponent("PublishLocalModal");

function reducer(action, state) {
  if (action.tag) {
    return /* Update */Block.__(0, [/* record */[
                /* name */state[/* name */0],
                /* useWorker */action[0]
              ]]);
  } else {
    return /* Update */Block.__(0, [/* record */[
                /* name */action[0],
                /* useWorker */state[/* useWorker */1]
              ]]);
  }
}

function _renderContent(state, send) {
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
                          value: state[/* name */0],
                          onChange: (function (_e) {
                              return Curry._1(send, changeName(_e));
                            })
                        }))), React.createElement("div", {
                  className: "content-field"
                }, React.createElement("div", {
                      className: "field-title"
                    }, DomHelper$WonderEditor.textEl("useWorker:")), React.createElement("div", {
                      className: "field-content"
                    }, React.createElement("input", {
                          defaultChecked: state[/* useWorker */1],
                          type: "checkbox",
                          onClick: (function (_e) {
                              return Curry._1(send, changeUseWorker(_e));
                            })
                        }))));
}

function render(title, param, param$1) {
  var state = param$1[/* state */1];
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
                          onClick: (function () {
                              return Curry._1(closeFunc, /* () */0);
                            })
                        })), _renderContent(state, param$1[/* send */3]), React.createElement("div", {
                      className: "modal-item-footer"
                    }, React.createElement("button", {
                          className: "footer-submit",
                          onClick: (function () {
                              return Curry._2(submitFunc, state[/* name */0], state[/* useWorker */1]);
                            })
                        }, DomHelper$WonderEditor.textEl("Submit")))));
}

function make(closeFunc, title, submitFunc, $staropt$star, $staropt$star$1, _) {
  var defaultName = $staropt$star !== undefined ? $staropt$star : "";
  var defaultUseWorker = $staropt$star$1 !== undefined ? $staropt$star$1 : false;
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
          /* initialState */(function () {
              return /* record */[
                      /* name */defaultName,
                      /* useWorker */defaultUseWorker
                    ];
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
