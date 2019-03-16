

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Modal$WonderEditor from "../../../../atom_component/modal/Modal.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as AllStateData$WonderEditor from "../../../../../service/stateTuple/data/AllStateData.js";
import * as DetectOSUtils$WonderEditor from "../../utils/DetectOSUtils.js";
import * as LanguageUtils$WonderEditor from "../../../../utils/language/LanguageUtils.js";
import * as AllHistoryService$WonderEditor from "../../../../../service/stateTuple/history/AllHistoryService.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateHistoryService$WonderEditor from "../../../../../service/stateTuple/history/StateHistoryService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../service/state/editor/LanguageEditorService.js";
import * as OperateStateHistoryService$WonderEditor from "../../../../../service/stateTuple/history/OperateStateHistoryService.js";
import * as HotKeysSettingEditorService$WonderEditor from "../../../../../service/state/editor/setting/HotKeysSettingEditorService.js";

function _handleRedo(uiState, dispatchFunc) {
  var match = OperateStateHistoryService$WonderEditor.hasRedoState(AllStateData$WonderEditor.getHistoryState(/* () */0));
  if (match) {
    return StateHistoryService$WonderEditor.getAndRefreshStateForHistory((function (param) {
                  return AllHistoryService$WonderEditor.redoHistoryState(uiState, dispatchFunc, param);
                }));
  } else {
    return /* () */0;
  }
}

function buildFileComponentSelectNav(send, uiState, dispatchFunc, languageType) {
  return React.createElement("div", {
              className: "item-content"
            }, React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return AllHistoryService$WonderEditor.handleUndo(uiState, dispatchFunc);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("file-undo", languageType)))), React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return _handleRedo(uiState, dispatchFunc);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("file-redo", languageType)))), React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return Curry._1(send, /* ShowControlsModal */0);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("file-controls", languageType)))));
}

function _handleHotKeyValueByOS(values) {
  var isMac = DetectOSUtils$WonderEditor.isMac(/* () */0);
  return values.filter((function (value) {
                if (isMac) {
                  return true;
                } else {
                  return !value.includes("command");
                }
              }));
}

function buildControlModalContent(param) {
  return StateLogicService$WonderEditor.getEditorState(HotKeysSettingEditorService$WonderEditor.getHotKeys).map((function (param, i) {
                return React.createElement("div", {
                            key: String(i),
                            className: "content-field"
                          }, React.createElement("div", {
                                className: "field-title"
                              }, DomHelper$WonderEditor.textEl(param[/* name */0])), React.createElement("div", {
                                className: "field-content"
                              }, DomHelper$WonderEditor.textEl(_handleHotKeyValueByOS(param[/* values */1]).join("|"))));
              }));
}

function buildFileComponent(param, param$1, param$2) {
  var hoverNavFunc = param$2[2];
  var toggleShowNavFunc = param$2[1];
  var isFileNav = param$2[0];
  var send = param[1];
  var className = isFileNav ? "item-title item-active" : "item-title";
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = param[0][/* isShowControlsModal */0];
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("span", {
                      className: className,
                      onClick: (function (e) {
                          return Curry._1(toggleShowNavFunc, /* () */0);
                        }),
                      onMouseOver: (function (e) {
                          return Curry._1(hoverNavFunc, /* () */0);
                        })
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("header-file", languageType)))), isFileNav ? buildFileComponentSelectNav(send, param$1[0], param$1[1], languageType) : null, match ? ReasonReact.element(undefined, undefined, Modal$WonderEditor.make(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("file-controls", languageType), buildControlModalContent(/* () */0), (function (param) {
                          return Curry._1(send, /* HideControlsModal */1);
                        }), undefined, /* array */[])) : null);
}

var Method = /* module */[
  /* _handleRedo */_handleRedo,
  /* buildFileComponentSelectNav */buildFileComponentSelectNav,
  /* _handleHotKeyValueByOS */_handleHotKeyValueByOS,
  /* buildControlModalContent */buildControlModalContent,
  /* buildFileComponent */buildFileComponent
];

var component = ReasonReact.reducerComponent("HeaderFile");

function reducer(action, state) {
  if (action) {
    return /* Update */Block.__(0, [/* record */[/* isShowControlsModal */false]]);
  } else {
    return /* Update */Block.__(0, [/* record */[/* isShowControlsModal */true]]);
  }
}

function render(param, param$1, param$2) {
  return buildFileComponent(/* tuple */[
              param$2[/* state */1],
              param$2[/* send */3]
            ], /* tuple */[
              param[0],
              param[1]
            ], /* tuple */[
              param$1[0],
              param$1[1],
              param$1[2]
            ]);
}

function make(uiState, dispatchFunc, isFileNav, toggleShowNavFunc, hoverNavFunc, _children) {
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
                        ], /* tuple */[
                          isFileNav,
                          toggleShowNavFunc,
                          hoverNavFunc
                        ], self);
            }),
          /* initialState */(function (param) {
              return /* record */[/* isShowControlsModal */false];
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
