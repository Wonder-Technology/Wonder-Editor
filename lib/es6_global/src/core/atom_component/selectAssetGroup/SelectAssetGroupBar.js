

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";

var component = ReasonReact.statelessComponent("SelectAssetGroupBar");

function render(param, param$1) {
  var sendFunc = param$1[1];
  var selectAssetFunc = param$1[0];
  return React.createElement("div", {
              className: "inspector-item"
            }, React.createElement("div", {
                  className: "item-header",
                  title: param[1]
                }, DomHelper$WonderEditor.textEl(param[0])), React.createElement("div", {
                  className: "item-content"
                }, React.createElement("div", {
                      className: "inspector-select"
                    }, React.createElement("div", {
                          className: "select-name",
                          onClick: (function (_e) {
                              return Curry._1(selectAssetFunc, sendFunc);
                            })
                        }, DomHelper$WonderEditor.textEl(param[2])), React.createElement("div", {
                          className: "select-img",
                          onClick: (function (_e) {
                              return Curry._1(selectAssetFunc, sendFunc);
                            })
                        }, React.createElement("img", {
                              src: "./public/img/select.png"
                            })))));
}

function make(headerText, headerTitle, assetText, selectAssetFunc, sendFunc, _children) {
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
              return render(/* tuple */[
                          headerText,
                          headerTitle,
                          assetText
                        ], /* tuple */[
                          selectAssetFunc,
                          sendFunc
                        ]);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
