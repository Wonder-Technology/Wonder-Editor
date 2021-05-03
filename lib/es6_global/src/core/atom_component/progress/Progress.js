

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as OptionService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";
import * as ReactUtils$WonderEditor from "../../utils/ui/ReactUtils.js";
import * as ProgressUtils$WonderEditor from "./utils/ProgressUtils.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";
import * as ManageEventEngineService$WonderEditor from "../../../service/state/engine/event/ManageEventEngineService.js";

function buildWidthPercentStr(percent) {
  return String(percent) + "%";
}

function didMount(send) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineState$1 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(ProgressUtils$WonderEditor.getProgressChangePercentCustomGlobalEventName(/* () */0), (function ($$event, engineState) {
          Curry._1(send, /* ChangePercent */[OptionService$Wonderjs.unsafeGet($$event[/* userData */4])]);
          return /* tuple */[
                  engineState,
                  $$event
                ];
        }), engineState, undefined, /* () */0);
  var engineState$2 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(ProgressUtils$WonderEditor.getProgressShowCustomGlobalEventName(/* () */0), (function ($$event, engineState) {
          Curry._1(send, /* Show */0);
          return /* tuple */[
                  engineState,
                  $$event
                ];
        }), engineState$1, undefined, /* () */0);
  var engineState$3 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(ProgressUtils$WonderEditor.getProgressHideCustomGlobalEventName(/* () */0), (function ($$event, engineState) {
          Curry._1(send, /* Hide */1);
          return /* tuple */[
                  engineState,
                  $$event
                ];
        }), engineState$2, undefined, /* () */0);
  StateEngineService$WonderEditor.setState(engineState$3);
  return /* () */0;
}

function willUnmount(param) {
  var engineState = ManageEventEngineService$WonderEditor.offCustomGlobalEventByEventName(ProgressUtils$WonderEditor.getProgressChangePercentCustomGlobalEventName(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var engineState$1 = ManageEventEngineService$WonderEditor.offCustomGlobalEventByEventName(ProgressUtils$WonderEditor.getProgressShowCustomGlobalEventName(/* () */0), engineState);
  var engineState$2 = ManageEventEngineService$WonderEditor.offCustomGlobalEventByEventName(ProgressUtils$WonderEditor.getProgressHideCustomGlobalEventName(/* () */0), engineState$1);
  StateEngineService$WonderEditor.setState(engineState$2);
  return /* () */0;
}

var Method = /* module */[
  /* buildWidthPercentStr */buildWidthPercentStr,
  /* didMount */didMount,
  /* willUnmount */willUnmount
];

var component = ReasonReact.reducerComponent("Progress");

function reducer(action, state) {
  if (typeof action === "number") {
    if (action !== 0) {
      return /* Update */Block.__(0, [/* record */[
                  /* percent */state[/* percent */0],
                  /* style */state[/* style */1],
                  /* visibleStyle */ReactUtils$WonderEditor.addStyleProp("display", "none", state[/* visibleStyle */2])
                ]]);
    } else {
      return /* Update */Block.__(0, [/* record */[
                  /* percent */state[/* percent */0],
                  /* style */state[/* style */1],
                  /* visibleStyle */ReactUtils$WonderEditor.addStyleProp("display", "flex", state[/* visibleStyle */2])
                ]]);
    }
  } else {
    var value = action[0];
    return /* Update */Block.__(0, [/* record */[
                /* percent */value,
                /* style */ReactUtils$WonderEditor.addStyleProp("width", String(value) + "%", state[/* style */1]),
                /* visibleStyle */state[/* visibleStyle */2]
              ]]);
  }
}

function render(param) {
  var state = param[/* state */1];
  return React.createElement("article", {
              key: "WonderProgress",
              className: "wonder-progress",
              id: "wonder-progress",
              style: state[/* visibleStyle */2]
            }, React.createElement("div", {
                  className: "progress-content"
                }, React.createElement("div", {
                      className: "content-percent",
                      style: state[/* style */1]
                    }, DomHelper$WonderEditor.textEl(String(state[/* percent */0]) + "%"))), React.createElement("div", {
                  className: "progress-bg"
                }));
}

function make(_children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (param) {
              return didMount(param[/* send */3]);
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */(function (param) {
              return willUnmount(/* () */0);
            }),
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */render,
          /* initialState */(function (param) {
              return /* record */[
                      /* percent */0,
                      /* style */{
                        width: String(0) + "%"
                      },
                      /* visibleStyle */{
                        display: "none"
                      }
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
