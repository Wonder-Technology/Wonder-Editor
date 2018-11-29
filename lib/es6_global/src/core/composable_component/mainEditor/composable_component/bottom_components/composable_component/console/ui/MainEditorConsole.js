

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Log$WonderLog from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Console$WonderEditor from "../../../../../../../external/Console.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as LogUtils$WonderEditor from "../../../../../../../utils/console/LogUtils.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as StoreUtils$WonderEditor from "../../../../../../../utils/ui/StoreUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../../service/atom/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as ConsoleBaseComponent$WonderEditor from "../atom_component/ConsoleBaseComponent/ui/ConsoleBaseComponent.js";
import * as MainEditorBottomComponentUtils$WonderEditor from "../../../utils/MainEditorBottomComponentUtils.js";
import * as CheckedCountConsoleEditorService$WonderEditor from "../../../../../../../../service/state/editor/console/CheckedCountConsoleEditorService.js";
import * as MessageArrayConsoleEditorService$WonderEditor from "../../../../../../../../service/state/editor/console/MessageArrayConsoleEditorService.js";

function setCheckedMessageCount(editorState) {
  return CheckedCountConsoleEditorService$WonderEditor.setConsoleCheckedCount(MessageArrayConsoleEditorService$WonderEditor.getConsoleMessageArrayLen(editorState), editorState);
}

function clearAllConsoleMessage(dispatchFunc) {
  StateEditorService$WonderEditor.setState(CheckedCountConsoleEditorService$WonderEditor.clearConsoleCheckedCount(MessageArrayConsoleEditorService$WonderEditor.clearConsoleMessageArray(StateEditorService$WonderEditor.getState(/* () */0))));
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* Console */5,
            /* BottomHeader */3
          ]]
      ]);
  return /* () */0;
}

function showConsoleMsgComponent(consoleMessageArr) {
  return consoleMessageArr.map((function (param) {
                var traceInfo = param[/* traceInfo */2];
                var message = param[/* message */0];
                switch (param[/* consoleType */1]) {
                  case 0 : 
                      return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, ConsoleBaseComponent$WonderEditor.make(message, traceInfo, "error", "./public/img/error.png", /* array */[]));
                  case 1 : 
                      return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, ConsoleBaseComponent$WonderEditor.make(message, traceInfo, "info", "./public/img/info.png", /* array */[]));
                  case 2 : 
                      return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, ConsoleBaseComponent$WonderEditor.make(message, traceInfo, "warn", "./public/img/warn.png", /* array */[]));
                  case 3 : 
                      return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, ConsoleBaseComponent$WonderEditor.make(message, traceInfo, "debug", "./public/img/debug.png", /* array */[]));
                  case 4 : 
                      return null;
                  case 5 : 
                      return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, ConsoleBaseComponent$WonderEditor.make(message, traceInfo, "log", "./public/img/log.png", /* array */[]));
                  
                }
              }));
}

var Method = /* module */[
  /* setCheckedMessageCount */setCheckedMessageCount,
  /* clearAllConsoleMessage */clearAllConsoleMessage,
  /* showConsoleMsgComponent */showConsoleMsgComponent
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorConsole");

function log11() {
  Log$WonderLog.print("log message");
  return /* () */0;
}

function info() {
  return Log$WonderLog.info("info message");
}

function warn11() {
  return Log$WonderLog.warn("warn message");
}

function debug() {
  var partial_arg = "";
  var partial_arg$1 = "create test debug";
  return Log$WonderLog.debug((function (param) {
                return LogUtils$WonderEditor.buildDebugMessage(partial_arg$1, partial_arg, param);
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
}

function fatal() {
  return Curry._2(Console$WonderEditor.tryCatch, (function () {
                return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("sss", "", "", ""));
              }), Console$WonderEditor.throwFatal);
}

function _renderHeader(dispatchFunc) {
  return React.createElement("div", {
              className: "console-header"
            }, React.createElement("button", {
                  className: "",
                  onClick: (function () {
                      return clearAllConsoleMessage(dispatchFunc);
                    })
                }, DomHelper$WonderEditor.textEl("clear")), React.createElement("button", {
                  className: "",
                  onClick: (function () {
                      Log$WonderLog.print("log message");
                      return /* () */0;
                    })
                }, DomHelper$WonderEditor.textEl("add log")), React.createElement("button", {
                  className: "",
                  onClick: (function () {
                      return Log$WonderLog.info("info message");
                    })
                }, DomHelper$WonderEditor.textEl("add info")), React.createElement("button", {
                  className: "",
                  onClick: (function () {
                      return Log$WonderLog.warn("warn message");
                    })
                }, DomHelper$WonderEditor.textEl("add warn")), React.createElement("button", {
                  className: "",
                  onClick: (function () {
                      return debug(/* () */0);
                    })
                }, DomHelper$WonderEditor.textEl("add debug")), React.createElement("button", {
                  className: "",
                  onClick: (function () {
                      return fatal(/* () */0);
                    })
                }, DomHelper$WonderEditor.textEl("add fatal")));
}

function render(store, dispatchFunc, _) {
  var consoleMessageArray = MessageArrayConsoleEditorService$WonderEditor.getConsoleMessageArray(StateEditorService$WonderEditor.getState(/* () */0));
  var match = MainEditorBottomComponentUtils$WonderEditor.isTypeEqualConsole(StoreUtils$WonderEditor.getBottomCurrentComponentType(store));
  if (match) {
    StateLogicService$WonderEditor.getAndSetEditorState(setCheckedMessageCount);
  }
  var match$1 = ArrayService$WonderEditor.hasItem(consoleMessageArray);
  return React.createElement("article", {
              key: "console",
              className: "wonder-bottom-console"
            }, React.createElement("article", {
                  className: "wonder-console-component"
                }, _renderHeader(dispatchFunc), React.createElement("div", {
                      className: "console-content"
                    }, match$1 ? showConsoleMsgComponent(consoleMessageArray) : null)));
}

function shouldUpdate(param) {
  return StoreUtils$WonderEditor.shouldComponentUpdate(/* Console */5, param[/* newSelf */1][/* retainedProps */2][/* updateTypeArr */0]);
}

function make(store, dispatchFunc, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */shouldUpdate,
          /* render */(function (param) {
              return render(store, dispatchFunc, param);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[/* updateTypeArr */StoreUtils$WonderEditor.getUpdateComponentTypeArr(store)],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  log11 ,
  info ,
  warn11 ,
  debug ,
  fatal ,
  _renderHeader ,
  render ,
  shouldUpdate ,
  make ,
  
}
/* component Not a pure module */
