

import * as Block from "../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../../../../external/Css.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";

Css$WonderEditor.importCss("./css/componentBox.css");

function showComponentFunc() {
  return /* ShowComponent */0;
}

var Method = /* module */[/* showComponentFunc */showComponentFunc];

var component = ReasonReact.reducerComponent("ComponentBox");

function reducer() {
  return (function (state) {
      var match = state[/* isShowComponent */0];
      if (match) {
        return /* Update */Block.__(0, [/* record */[
                    /* isShowComponent */false,
                    /* triangleDirection */"triangle-right"
                  ]]);
      } else {
        return /* Update */Block.__(0, [/* record */[
                    /* isShowComponent */true,
                    /* triangleDirection */"triangle-bottom"
                  ]]);
      }
    });
}

function render(header, closable, gameObjectComponent, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  var match = state[/* isShowComponent */0];
  return React.createElement("article", {
              className: "componentBox-component"
            }, React.createElement("div", {
                  className: "header"
                }, React.createElement("div", {
                      className: "header-triangle",
                      onClick: (function () {
                          return Curry._1(send, /* ShowComponent */0);
                        })
                    }, React.createElement("span", {
                          className: state[/* triangleDirection */1]
                        })), React.createElement("div", {
                      className: "header-title"
                    }, DomHelper$WonderEditor.textEl(header)), closable ? React.createElement("span", {
                        className: "header-close"
                      }, DomHelper$WonderEditor.textEl("x")) : null), match ? gameObjectComponent : null);
}

function make(header, closable, gameObjectComponent, _) {
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
              return render(header, closable, gameObjectComponent, self);
            }),
          /* initialState */(function () {
              return /* record */[
                      /* isShowComponent */true,
                      /* triangleDirection */"triangle-bottom"
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
  render ,
  make ,
  
}
/*  Not a pure module */
