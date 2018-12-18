

import * as Block from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";

var component = ReasonReact.reducerComponent("AddableComponentBox");

function reducer(action, state) {
  return /* Update */Block.__(0, [/* record */[/* isShowComponentList */!state[/* isShowComponentList */0]]]);
}

function render(categoryType, componentArr, addSpecificComponent, param) {
  var send = param[/* send */3];
  var match = param[/* state */1][/* isShowComponentList */0];
  return React.createElement("article", {
              className: "wonder-addable-componentBox"
            }, React.createElement("div", {
                  className: "category-header",
                  onClick: (function (_e) {
                      return Curry._1(send, /* ToggleShowList */0);
                    })
                }, DomHelper$WonderEditor.textEl(categoryType)), match ? React.createElement("div", {
                    className: "category-content"
                  }, React.createElement("div", {
                        className: "content-list"
                      }, componentArr.map((function (param) {
                              var type_ = param[/* type_ */0];
                              return React.createElement("div", {
                                          key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                                          className: "content-type",
                                          onClick: (function (_e) {
                                              return Curry._1(addSpecificComponent, type_);
                                            })
                                        }, DomHelper$WonderEditor.textEl(type_));
                            })))) : null);
}

function make(categoryType, componentArr, addSpecificComponent, _children) {
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
              return render(categoryType, componentArr, addSpecificComponent, self);
            }),
          /* initialState */(function (param) {
              return /* record */[/* isShowComponentList */false];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
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
