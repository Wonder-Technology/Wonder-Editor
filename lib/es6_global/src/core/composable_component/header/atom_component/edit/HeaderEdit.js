

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as LogUtils$WonderEditor from "../../../../utils/console/LogUtils.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as ConsoleUtils$WonderEditor from "../../../../utils/ui/ConsoleUtils.js";
import * as LanguageUtils$WonderEditor from "../../../../utils/language/LanguageUtils.js";
import * as SingleInputModal$WonderEditor from "../../../../atom_component/singleInputModal/SingleInputModal.js";
import * as AllHistoryService$WonderEditor from "../../../../../service/stateTuple/history/AllHistoryService.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StoreHistoryUtils$WonderEditor from "../../../../ui/eventHandler/utils/StoreHistoryUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as StateHistoryService$WonderEditor from "../../../../../service/stateTuple/history/StateHistoryService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../service/state/editor/LanguageEditorService.js";
import * as HeaderExportSceneUtils$WonderEditor from "../../utils/export/HeaderExportSceneUtils.js";
import * as HeaderExportPackageUtils$WonderEditor from "../../utils/export/HeaderExportPackageUtils.js";
import * as HeaderImportPackageUtils$WonderEditor from "../../utils/import/HeaderImportPackageUtils.js";

function importPackage(param, closeNavFunc, $$event) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  StoreHistoryUtils$WonderEditor.storeHistoryStateWithNoCopyEngineState(uiState, StateHistoryService$WonderEditor.getStateForHistory(/* () */0));
  return HeaderImportPackageUtils$WonderEditor.importPackage(dispatchFunc, $$event).then((function (param) {
                  return Promise.resolve(Curry._1(closeNavFunc, /* () */0));
                })).catch((function (e) {
                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                var message = e.message;
                var stack = e.stack;
                ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("" + (String(message) + ""), "", "", ""), editorState);
                ConsoleUtils$WonderEditor.logStack(stack);
                return Promise.resolve(AllHistoryService$WonderEditor.handleUndo(uiState, dispatchFunc));
              }));
}

function _buildImportUI(param, closeNavFunc, languageType) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  return React.createElement("div", {
              className: "content-section"
            }, React.createElement("input", {
                  className: "section-fileLoad",
                  multiple: false,
                  type: "file",
                  onChange: (function (e) {
                      importPackage(/* tuple */[
                            uiState,
                            dispatchFunc
                          ], closeNavFunc, e);
                      return /* () */0;
                    })
                }), React.createElement("span", {
                  className: "section-header"
                }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("edit-import-package", languageType))));
}

function _buildExportUI(send, languageType) {
  return React.createElement(React.Fragment, undefined, React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return Curry._1(send, /* ShowExportPackageModal */0);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("edit-export-package", languageType)))), React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return Curry._1(send, /* ShowExportSceneModal */2);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("edit-export-scene", languageType)))));
}

function buildEditComponentSelectNav(param, send, closeNavFunc, languageType) {
  return React.createElement("div", {
              className: "item-content item-edit"
            }, _buildImportUI(/* tuple */[
                  param[0],
                  param[1]
                ], closeNavFunc, languageType), _buildExportUI(send, languageType));
}

var Method = /* module */[
  /* importPackage */importPackage,
  /* _buildImportUI */_buildImportUI,
  /* _buildExportUI */_buildExportUI,
  /* buildEditComponentSelectNav */buildEditComponentSelectNav
];

var component = ReasonReact.reducerComponent("HeaderEdit");

function reducer(action, state) {
  switch (action) {
    case 0 : 
        return /* Update */Block.__(0, [/* record */[
                    /* isShowExportPackageModal */true,
                    /* isShowExportSceneModal */state[/* isShowExportSceneModal */1]
                  ]]);
    case 1 : 
        return /* Update */Block.__(0, [/* record */[
                    /* isShowExportPackageModal */false,
                    /* isShowExportSceneModal */state[/* isShowExportSceneModal */1]
                  ]]);
    case 2 : 
        return /* Update */Block.__(0, [/* record */[
                    /* isShowExportPackageModal */state[/* isShowExportPackageModal */0],
                    /* isShowExportSceneModal */true
                  ]]);
    case 3 : 
        return /* Update */Block.__(0, [/* record */[
                    /* isShowExportPackageModal */state[/* isShowExportPackageModal */0],
                    /* isShowExportSceneModal */false
                  ]]);
    
  }
}

function render(param, param$1, param$2) {
  var send = param$2[/* send */3];
  var state = param$2[/* state */1];
  var hoverNavFunc = param$1[2];
  var toggleShowNavFunc = param$1[1];
  var isEditNav = param$1[0];
  var className = isEditNav ? "item-title item-active" : "item-title";
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = state[/* isShowExportPackageModal */0];
  var match$1 = state[/* isShowExportSceneModal */1];
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
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("header-edit", languageType)))), isEditNav ? buildEditComponentSelectNav(/* tuple */[
                    param[0],
                    param[1]
                  ], send, param$1[3], languageType) : null, match ? ReasonReact.element(undefined, undefined, SingleInputModal$WonderEditor.make((function (param) {
                          return Curry._1(send, /* HideExportPackageModal */1);
                        }), LanguageUtils$WonderEditor.getHeaderLanguageDataByType("edit-export-package", languageType), (function (packageName) {
                          HeaderExportPackageUtils$WonderEditor.exportPackage(packageName);
                          return Curry._1(send, /* HideExportPackageModal */1);
                        }), "WonderPackage", /* array */[])) : null, match$1 ? ReasonReact.element(undefined, undefined, SingleInputModal$WonderEditor.make((function (param) {
                          return Curry._1(send, /* HideExportSceneModal */3);
                        }), LanguageUtils$WonderEditor.getHeaderLanguageDataByType("edit-export-scene", languageType), (function (sceneName) {
                          HeaderExportSceneUtils$WonderEditor.exportScene(sceneName);
                          return Curry._1(send, /* HideExportSceneModal */3);
                        }), "WonderScene", /* array */[])) : null);
}

function make(uiState, dispatchFunc, isEditNav, toggleShowNavFunc, hoverNavFunc, closeNavFunc, _children) {
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
                          isEditNav,
                          toggleShowNavFunc,
                          hoverNavFunc,
                          closeNavFunc
                        ], self);
            }),
          /* initialState */(function (param) {
              return /* record */[
                      /* isShowExportPackageModal */false,
                      /* isShowExportSceneModal */false
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
