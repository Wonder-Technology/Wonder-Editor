

import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";

function hideLoading (loadingDomId){
                          document.querySelector("#" + loadingDomId).style.display = "none";
    };

var Method = /* module */[/* hideLoading */hideLoading];

var component = ReasonReact.statelessComponent("AppShell");

function render(_self) {
  return React.createElement("article", {
              key: "appShell",
              className: "wonder-app-shell"
            }, React.createElement("div", {
                  className: "shell-header"
                }), React.createElement("div", {
                  className: "shell-controller"
                }), React.createElement("div", {
                  className: "shell-mainEditor"
                }, React.createElement("div", {
                      className: "left-component"
                    }, React.createElement("div", {
                          className: "top-widget"
                        }, React.createElement("div", {
                              className: "shell-scene-tree"
                            }), React.createElement("div", {
                              className: "webgl-parent"
                            })), React.createElement("div", {
                          className: "bottom-widget"
                        }, React.createElement("div", {
                              className: "wonder-bottom-component"
                            }, React.createElement("div", {
                                  className: "bottom-header"
                                }), React.createElement("div", {
                                  className: "wonder-bottom-project"
                                })))), React.createElement("div", {
                      className: "right-component"
                    })));
}

function make(_children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (self) {
              return hideLoading("loading");
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */render,
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
