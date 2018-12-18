

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";

var component = ReasonReact.statelessComponent("Modal");

function _renderFooter(submitFunc) {
  if (submitFunc !== undefined) {
    var submitFunc$1 = submitFunc;
    return React.createElement("div", {
                className: "modal-item-footer"
              }, React.createElement("button", {
                    className: "footer-submit",
                    onClick: (function (_e) {
                        return Curry._1(submitFunc$1, /* () */0);
                      })
                  }, DomHelper$WonderEditor.textEl("Submit")));
  } else {
    return null;
  }
}

function render(title, content, param, _self) {
  var closeFunc = param[0];
  return React.createElement("article", {
              className: "wonder-modal"
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
                    }, content), _renderFooter(param[1])));
}

function make(closeFunc, title, content, submitFunc, _children) {
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
              return render(title, content, /* tuple */[
                          closeFunc,
                          submitFunc
                        ], _self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  component ,
  _renderFooter ,
  render ,
  make ,
  
}
/* component Not a pure module */
