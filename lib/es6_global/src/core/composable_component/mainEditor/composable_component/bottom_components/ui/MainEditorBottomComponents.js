

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Console$WonderEditor from "../../../../../external/Console.js";
import * as AppStore$WonderEditor from "../../../../../ui/store/AppStore.js";
import * as StoreUtils$WonderEditor from "../../../../../utils/ui/StoreUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../service/atom/ArrayService.js";
import * as MainEditorConsole$WonderEditor from "../composable_component/console/ui/MainEditorConsole.js";
import * as MainEditorProject$WonderEditor from "../composable_component/project/ui/MainEditorProject.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as MainEditorBottomHeader$WonderEditor from "../atom_component/header/ui/MainEditorBottomHeader.js";
import * as MainEditorBottomComponentUtils$WonderEditor from "../utils/MainEditorBottomComponentUtils.js";
import * as MessageArrayConsoleEditorService$WonderEditor from "../../../../../../service/state/editor/console/MessageArrayConsoleEditorService.js";

function triggerConsoleByType(dispatchFunc, type_, message) {
  var partial_arg = /* record */[
    /* message */message,
    /* consoleType */type_,
    /* traceInfo */undefined
  ];
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return MessageArrayConsoleEditorService$WonderEditor.addConsoleMessage(partial_arg, param);
        }));
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* Console */5,
            /* BottomHeader */3
          ]]
      ]);
  return /* () */0;
}

function triggerTrace(dispatchFunc, message) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var copiedMessageArr = MessageArrayConsoleEditorService$WonderEditor.getConsoleMessageArray(editorState).slice();
  var match = copiedMessageArr.pop();
  if (match !== undefined) {
    if (match[/* traceInfo */2] !== undefined) {
      
    } else {
      StateEditorService$WonderEditor.setState(MessageArrayConsoleEditorService$WonderEditor.setConsoleMessageArray(ArrayService$WonderEditor.push(/* record */[
                    /* message */match[/* message */0],
                    /* consoleType */match[/* consoleType */1],
                    /* traceInfo */message
                  ], copiedMessageArr), editorState));
    }
  }
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* Console */5,
            /* BottomHeader */3
          ]]
      ]);
  return /* () */0;
}

var Method = /* module */[
  /* triggerConsoleByType */triggerConsoleByType,
  /* triggerTrace */triggerTrace
];

var component = ReasonReact.statelessComponent("MainEditorBottomComponents");

function render(param, _) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var currentComponentType = StoreUtils$WonderEditor.getBottomCurrentComponentType(uiState);
  var match = MainEditorBottomComponentUtils$WonderEditor.isTypeEqualProject(currentComponentType);
  var match$1 = MainEditorBottomComponentUtils$WonderEditor.isTypeEqualConsole(currentComponentType);
  return React.createElement("article", {
              key: "MainEditorBottomComponents",
              className: "wonder-bottom-component"
            }, ReasonReact.element(undefined, undefined, MainEditorBottomHeader$WonderEditor.make(uiState, dispatchFunc, /* array */[])), match ? ReasonReact.element(undefined, undefined, MainEditorProject$WonderEditor.make(uiState, dispatchFunc, /* array */[])) : null, match$1 ? ReasonReact.element(undefined, undefined, MainEditorConsole$WonderEditor.make(uiState, dispatchFunc, /* array */[])) : null);
}

function make(uiState, dispatchFunc, _) {
  Curry._6(Console$WonderEditor.stubConsole, (function (param) {
          return triggerConsoleByType(dispatchFunc, /* Error */0, param);
        }), (function (param) {
          return triggerConsoleByType(dispatchFunc, /* Info */1, param);
        }), (function (param) {
          return triggerConsoleByType(dispatchFunc, /* Warn */2, param);
        }), (function (param) {
          return triggerConsoleByType(dispatchFunc, /* Debug */3, param);
        }), (function (param) {
          return triggerTrace(dispatchFunc, param);
        }), (function (param) {
          return triggerConsoleByType(dispatchFunc, /* Log */5, param);
        }));
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
              return render(/* tuple */[
                          uiState,
                          dispatchFunc
                        ], self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
