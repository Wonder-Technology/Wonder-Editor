

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";

function showAssets(param, sendFunc) {
  var getTextFunc = param[3];
  var changeAssetFunc = param[2];
  var isAssetFunc = param[1];
  return Curry._1(param[0], /* () */0).map((function (item) {
                var match = Curry._1(isAssetFunc, item);
                var className = match ? "select-item-content select-item-active" : "select-item-content";
                return React.createElement("div", {
                            key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                            className: className,
                            onClick: (function (_e) {
                                return Curry._2(changeAssetFunc, item, sendFunc);
                              })
                          }, DomHelper$WonderEditor.textEl(Curry._1(getTextFunc, item)));
              }));
}

var Method = /* module */[/* showAssets */showAssets];

var component = ReasonReact.statelessComponent("SelectAssetGroupWidget");

function render(headerText, param, param$1) {
  var sendFunc = param[1];
  var clickHideGroupButtonFunc = param[0];
  return React.createElement("div", {
              className: "select-component-content"
            }, React.createElement("div", {
                  className: "select-component-item"
                }, React.createElement("div", {
                      className: "select-item-header"
                    }, DomHelper$WonderEditor.textEl(headerText)), React.createElement("div", {
                      className: "select-item-body"
                    }, showAssets(/* tuple */[
                          param$1[0],
                          param$1[1],
                          param$1[2],
                          param$1[3]
                        ], sendFunc))), React.createElement("div", {
                  className: "select-component-bg",
                  onClick: (function (_e) {
                      return Curry._1(clickHideGroupButtonFunc, sendFunc);
                    })
                }));
}

function make(headerText, clickHideGroupButtonFunc, sendFunc, getAllAssetsFunc, isAssetFunc, changeAssetFunc, getTextFunc, _children) {
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
              return render(headerText, /* tuple */[
                          clickHideGroupButtonFunc,
                          sendFunc
                        ], /* tuple */[
                          getAllAssetsFunc,
                          isAssetFunc,
                          changeAssetFunc,
                          getTextFunc
                        ]);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
