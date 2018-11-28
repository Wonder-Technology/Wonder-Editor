

import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as ReactColor$WonderEditor from "../../../../../../../external/library/ReactColor.js";

var component = ReasonReact.reducerComponent("PickColorComponent");

function reducer(param, action, state) {
  if (action) {
    Curry._1(param[0], state[/* colorHex */0]);
    return /* Update */Block.__(0, [/* record */[
                /* colorHex */Curry._1(param[1], /* () */0),
                /* isShowColorPick */false
              ]]);
  } else {
    return /* Update */Block.__(0, [/* record */[
                /* colorHex */state[/* colorHex */0],
                /* isShowColorPick */true
              ]]);
  }
}

function render(label, changeColorFunc, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  var match = state[/* isShowColorPick */1];
  return React.createElement("article", {
              className: "inspector-item"
            }, React.createElement("div", {
                  className: "item-header"
                }, DomHelper$WonderEditor.textEl(label)), React.createElement("div", {
                  className: "item-content item-color"
                }, React.createElement("div", {
                      className: "color-hex",
                      style: {
                        background: state[/* colorHex */0]
                      },
                      onClick: (function () {
                          return Curry._1(send, /* ShowColorPick */0);
                        })
                    }), React.createElement("div", {
                      className: "color-select",
                      onClick: (function () {
                          return Curry._1(send, /* ShowColorPick */0);
                        })
                    }, React.createElement("img", {
                          src: "./public/img/color.png"
                        }))), match ? React.createElement("div", {
                    className: "color-pick-content"
                  }, React.createElement("div", {
                        className: "color-pick-item"
                      }, ReasonReact.element(undefined, undefined, ReactColor$WonderEditor.Sketch[/* make */0](state[/* colorHex */0], (function (value, _) {
                                  return Curry._1(changeColorFunc, value);
                                }), /* array */[]))), React.createElement("div", {
                        className: "color-pick-bg",
                        onClick: (function () {
                            return Curry._1(send, /* HideColorPick */1);
                          })
                      })) : null);
}

function make(label, getColorFunc, changeColorFunc, closeColorPickFunc, _) {
  var partial_arg = /* tuple */[
    closeColorPickFunc,
    getColorFunc
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
              return render(label, changeColorFunc, self);
            }),
          /* initialState */(function () {
              return /* record */[
                      /* colorHex */Curry._1(getColorFunc, /* () */0),
                      /* isShowColorPick */false
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, param, param$1);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
