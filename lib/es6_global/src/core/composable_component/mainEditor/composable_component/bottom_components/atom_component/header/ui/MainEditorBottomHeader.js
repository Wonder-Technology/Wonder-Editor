

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as StoreUtils$WonderEditor from "../../../../../../../utils/ui/StoreUtils.js";
import * as ConsoleDataUtils$WonderEditor from "../../../utils/ConsoleDataUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as MainEditorBottomComponentUtils$WonderEditor from "../../../utils/MainEditorBottomComponentUtils.js";
import * as CheckedCountConsoleEditorService$WonderEditor from "../../../../../../../../service/state/editor/console/CheckedCountConsoleEditorService.js";

function showProject(dispatchFunc) {
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.ShowComponentAction,
        /* ChangeComponent */[/* Project */0]
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* BottomHeader */3,
            /* Project */4
          ]]
      ]);
  return /* () */0;
}

function showConsole(dispatchFunc) {
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.ShowComponentAction,
        /* ChangeComponent */[/* Console */1]
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* BottomHeader */3,
            /* Console */5
          ]]
      ]);
  return /* () */0;
}

function getConsoleMessageUnReadCount(componentType, editorState) {
  var match = MainEditorBottomComponentUtils$WonderEditor.isTypeEqualConsole(componentType);
  if (match) {
    return "0";
  } else {
    var count = CheckedCountConsoleEditorService$WonderEditor.unreadConsoleMessage(editorState);
    var maxMessageCount = ConsoleDataUtils$WonderEditor.getMaxMessageCount(/* () */0);
    var match$1 = count >= maxMessageCount;
    if (match$1) {
      return String(maxMessageCount);
    } else {
      return String(count);
    }
  }
}

var Method = /* module */[
  /* showProject */showProject,
  /* showConsole */showConsole,
  /* getConsoleMessageUnReadCount */getConsoleMessageUnReadCount
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorBottomHeader");

function _renderConsole(currentComponentType, dispatchFunc) {
  var unreadCount = StateLogicService$WonderEditor.getEditorState((function (param) {
          return getConsoleMessageUnReadCount(currentComponentType, param);
        }));
  var match = MainEditorBottomComponentUtils$WonderEditor.isTypeEqualConsole(currentComponentType);
  var match$1 = unreadCount !== "0";
  return React.createElement("div", {
              className: "category-name" + (
                match ? " category-active" : ""
              ),
              onClick: (function (_e) {
                  var match = MainEditorBottomComponentUtils$WonderEditor.isTypeEqualConsole(currentComponentType);
                  if (match) {
                    return /* () */0;
                  } else {
                    return showConsole(dispatchFunc);
                  }
                })
            }, React.createElement("div", {
                  className: "name-header"
                }, DomHelper$WonderEditor.textEl("Console")), match$1 ? React.createElement("div", {
                    className: "name-tail"
                  }, DomHelper$WonderEditor.textEl(unreadCount)) : null);
}

function render(uiState, dispatchFunc, _self) {
  var currentComponentType = StoreUtils$WonderEditor.getBottomCurrentComponentType(uiState);
  var match = MainEditorBottomComponentUtils$WonderEditor.isTypeEqualProject(currentComponentType);
  return React.createElement("article", {
              key: "MainEditorBottomHeader",
              className: "bottom-header"
            }, React.createElement("div", {
                  className: "bottom-widget-category"
                }, React.createElement("div", {
                      className: "category-name" + (
                        match ? " category-active" : ""
                      ),
                      onClick: (function (_e) {
                          var match = MainEditorBottomComponentUtils$WonderEditor.isTypeEqualProject(currentComponentType);
                          if (match) {
                            return /* () */0;
                          } else {
                            return showProject(dispatchFunc);
                          }
                        })
                    }, React.createElement("div", {
                          className: "name-header"
                        }, DomHelper$WonderEditor.textEl("Project"))), _renderConsole(currentComponentType, dispatchFunc), React.createElement("span", {
                      className: "category-name"
                    })));
}

function shouldUpdate(param) {
  return StoreUtils$WonderEditor.shouldComponentUpdate(/* BottomHeader */3, param[/* newSelf */1][/* retainedProps */2][/* updateTypeArr */0]);
}

function make(uiState, dispatchFunc, _children) {
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
              return render(uiState, dispatchFunc, param);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[/* updateTypeArr */StoreUtils$WonderEditor.getUpdateComponentTypeArr(uiState)],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  _renderConsole ,
  render ,
  shouldUpdate ,
  make ,
  
}
/* component Not a pure module */
