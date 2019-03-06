

import * as Block from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Js_option from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";

function buildMultiLineStringComponent(str) {
  return str.split("\n").map((function (info, i) {
                return React.createElement("p", {
                            key: "info" + String(i),
                            className: "multi-line-str"
                          }, DomHelper$WonderEditor.textEl(info));
              }));
}

var buildTraceComponent = buildMultiLineStringComponent;

var Method = /* module */[
  /* buildMultiLineStringComponent */buildMultiLineStringComponent,
  /* buildTraceComponent */buildTraceComponent
];

var component = ReasonReact.reducerComponent("ConsoleBaseComponent");

function reducer(action, state) {
  return /* Update */Block.__(0, [/* record */[
              /* isShowTrace */!state[/* isShowTrace */0],
              /* hasTrace */state[/* hasTrace */1],
              /* traceString */state[/* traceString */2]
            ]]);
}

function render(type_, param, param$1) {
  var send = param$1[/* send */3];
  var state = param$1[/* state */1];
  var match = state[/* hasTrace */1];
  var match$1 = state[/* hasTrace */1] && state[/* isShowTrace */0];
  return React.createElement("article", {
              className: "console-" + type_
            }, React.createElement("div", {
                  className: "console-header",
                  onClick: (function (_e) {
                      return Curry._1(send, /* ToggleShowTrace */0);
                    })
                }, React.createElement("img", {
                      src: param[1]
                    }), match ? React.createElement("img", {
                        src: "./public/img/more.png"
                      }) : null, React.createElement("div", {
                      className: "header-message"
                    }, buildMultiLineStringComponent(param[0]))), match$1 ? React.createElement("div", {
                    className: "console-trace"
                  }, buildMultiLineStringComponent(state[/* traceString */2])) : null);
}

function make(message, traceInfo, type_, imageSrc, _children) {
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
              return render(type_, /* tuple */[
                          message,
                          imageSrc
                        ], self);
            }),
          /* initialState */(function (param) {
              var match = Js_option.isSome(traceInfo);
              return /* record */[
                      /* isShowTrace */false,
                      /* hasTrace */Js_option.isSome(traceInfo),
                      /* traceString */match ? Js_option.getExn(traceInfo) : ""
                    ];
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
  render ,
  make ,
  
}
/* component Not a pure module */
