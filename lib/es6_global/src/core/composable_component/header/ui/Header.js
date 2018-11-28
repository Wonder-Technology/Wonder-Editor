

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Zip$WonderBsJszip from "../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zip.js";
import * as DomUtils$WonderEditor from "../../../utils/ui/DomUtils.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as AllHistoryService$WonderEditor from "../../../../service/stateTuple/history/AllHistoryService.js";
import * as AppExtensionUtils$WonderEditor from "../../../utils/extension/AppExtensionUtils.js";
import * as HeaderExportUtils$WonderEditor from "../utils/header_export/HeaderExportUtils.js";
import * as HeaderImportUtils$WonderEditor from "../utils/header_import/HeaderImportUtils.js";
import * as StateHistoryService$WonderEditor from "../../../../service/stateTuple/history/StateHistoryService.js";

function getStorageParentKey() {
  return "userExtension";
}

function addExtension(text) {
  return AppExtensionUtils$WonderEditor.setExtension("userExtension", text);
}

function buildFileComponent(state, send, store, dispatchFunc) {
  var match = state[/* currentSelectNav */1] === /* File */1;
  var className = match ? "item-title item-active" : "item-title";
  var match$1 = state[/* currentSelectNav */1] === /* File */1;
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("span", {
                      className: className,
                      onClick: (function () {
                          return Curry._1(send, /* ToggleShowNav */Block.__(1, [/* File */1]));
                        }),
                      onMouseOver: (function () {
                          return Curry._1(send, /* HoverNav */Block.__(0, [/* File */1]));
                        })
                    }, DomHelper$WonderEditor.textEl("File"))), match$1 ? React.createElement("div", {
                    className: "item-content"
                  }, React.createElement("div", {
                        className: "content-section",
                        onClick: (function () {
                            return StateHistoryService$WonderEditor.getAndRefreshStateForHistory((function (param) {
                                          return AllHistoryService$WonderEditor.undoHistoryState(store, dispatchFunc, param);
                                        }));
                          })
                      }, React.createElement("span", {
                            className: "section-header"
                          }, DomHelper$WonderEditor.textEl("Undo")), React.createElement("span", {
                            className: "section-tail"
                          }, DomHelper$WonderEditor.textEl("Ctrl+Z"))), React.createElement("div", {
                        className: "content-section",
                        onClick: (function () {
                            return StateHistoryService$WonderEditor.getAndRefreshStateForHistory((function (param) {
                                          return AllHistoryService$WonderEditor.redoHistoryState(store, dispatchFunc, param);
                                        }));
                          })
                      }, React.createElement("span", {
                            className: "section-header"
                          }, DomHelper$WonderEditor.textEl("Redo")), React.createElement("span", {
                            className: "section-tail"
                          }, DomHelper$WonderEditor.textEl("Ctrl+U")))) : null);
}

function buildEditComponent(state, send, _, dispatchFunc) {
  var match = state[/* currentSelectNav */1] === /* Edit */2;
  var className = match ? "item-title item-active" : "item-title";
  var match$1 = state[/* currentSelectNav */1] === /* Edit */2;
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("span", {
                      className: className,
                      onClick: (function () {
                          var match = state[/* isSelectNav */0];
                          if (match) {
                            return Curry._1(send, /* BlurNav */0);
                          } else {
                            return Curry._1(send, /* ToggleShowNav */Block.__(1, [/* Edit */2]));
                          }
                        }),
                      onMouseOver: (function () {
                          return Curry._1(send, /* HoverNav */Block.__(0, [/* Edit */2]));
                        })
                    }, DomHelper$WonderEditor.textEl("Edit"))), match$1 ? React.createElement("div", {
                    className: "item-content item-edit"
                  }, React.createElement("div", {
                        className: "content-section"
                      }, React.createElement("input", {
                            className: "section-fileLoad",
                            multiple: false,
                            type: "file",
                            onChange: (function (e) {
                                return HeaderImportUtils$WonderEditor.importPackage(Zip$WonderBsJszip.create, dispatchFunc, e);
                              })
                          }), React.createElement("span", {
                            className: "section-header"
                          }, DomHelper$WonderEditor.textEl("Import Package"))), React.createElement("div", {
                        className: "content-section",
                        onClick: (function () {
                            HeaderExportUtils$WonderEditor.exportPackage(Zip$WonderBsJszip.create, (function (prim) {
                                    return fetch(prim);
                                  }));
                            return /* () */0;
                          })
                      }, React.createElement("span", {
                            className: "section-header"
                          }, DomHelper$WonderEditor.textEl("Export Package")))) : null);
}

var Method = /* module */[
  /* getStorageParentKey */getStorageParentKey,
  /* addExtension */addExtension,
  /* buildFileComponent */buildFileComponent,
  /* buildEditComponent */buildEditComponent
];

var component = ReasonReact.reducerComponent("Header");

function reducer(action, state) {
  if (typeof action === "number") {
    return /* Update */Block.__(0, [/* record */[
                /* isSelectNav */false,
                /* currentSelectNav : None */0
              ]]);
  } else if (action.tag) {
    var match = state[/* isSelectNav */0];
    if (match) {
      return /* Update */Block.__(0, [/* record */[
                  /* isSelectNav */false,
                  /* currentSelectNav : None */0
                ]]);
    } else {
      return /* Update */Block.__(0, [/* record */[
                  /* isSelectNav */true,
                  /* currentSelectNav */action[0]
                ]]);
    }
  } else {
    var match$1 = state[/* isSelectNav */0];
    if (match$1) {
      return /* Update */Block.__(0, [/* record */[
                  /* isSelectNav */state[/* isSelectNav */0],
                  /* currentSelectNav */action[0]
                ]]);
    } else {
      return /* NoUpdate */0;
    }
  }
}

function render(store, dispatchFunc, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  return React.createElement("article", {
              key: "header",
              className: "wonder-header-component"
            }, React.createElement("div", {
                  className: "header-nav"
                }, buildFileComponent(state, send, store, dispatchFunc), buildEditComponent(state, send, store, dispatchFunc)));
}

function make(store, dispatchFunc, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (param) {
              var send = param[/* send */3];
              return DomHelper$WonderEditor.addEventListener(document, "click", (function (e) {
                            var target = e.target;
                            var targetArray = document.getElementsByClassName("item-title");
                            var match = DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, targetArray);
                            if (match) {
                              return /* () */0;
                            } else {
                              return Curry._1(send, /* BlurNav */0);
                            }
                          }));
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(store, dispatchFunc, self);
            }),
          /* initialState */(function () {
              return /* record */[
                      /* isSelectNav */false,
                      /* currentSelectNav : None */0
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
/* component Not a pure module */
