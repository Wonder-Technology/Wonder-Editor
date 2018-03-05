'use strict';

import * as Curry                                            from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                            from "react";
import * as ReasonReact                                      from "../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                                 from "../../../external/Css.js";
import * as DomHelper$WonderEditor                           from "../../../external/DomHelper.js";
import * as FileInput$WonderEditor                           from "../fileInput/FileInput.js";
import * as StateFacade$WonderEditor                         from "../../../../facade/StateFacade.js";
import * as AppExtensionView$WonderEditor                    from "../../../logic/view/AppExtensionView.js";
import * as StateHistoryView$WonderEditor                    from "../../../logic/view/StateHistoryView.js";
import * as HeaderAddGameObjectEventHandler$WonderEditor     from "./eventHandler/HeaderAddGameObjectEventHandler.js";
import * as HeaderDisposeGameObjectEventHandler$WonderEditor from "./eventHandler/HeaderDisposeGameObjectEventHandler.js";

Css$WonderEditor.importCss("./css/header.css");

function getStorageParentKey() {
  return "userExtension";
}

function addExtension(text) {
  return AppExtensionView$WonderEditor.setExtension("userExtension", text);
}

var addBox = HeaderAddGameObjectEventHandler$WonderEditor.MakeEventHandler[/* onClick */2];

var disposeCurrentGameObject = HeaderDisposeGameObjectEventHandler$WonderEditor.MakeEventHandler[/* onClick */2];

function buildOperateHistoryComponent(store, dispatch) {
  return React.createElement("div", undefined, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return StateFacade$WonderEditor.getAndSetState((function (param) {
                                        return StateHistoryView$WonderEditor.undoHistoryState(store, dispatch, param);
                                      }));
                        })
                    }, DomHelper$WonderEditor.textEl("undo"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return StateFacade$WonderEditor.getAndSetState((function (param) {
                                        return StateHistoryView$WonderEditor.redoHistoryState(store, dispatch, param);
                                      }));
                        })
                    }, DomHelper$WonderEditor.textEl("redo"))));
}

function buildOperateGameObjectComponent(store, dispatch) {
  return React.createElement("div", undefined, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return Curry._3(addBox, /* tuple */[
                                      store,
                                      dispatch
                                    ], "box", /* () */0);
                        })
                    }, DomHelper$WonderEditor.textEl("add box"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return Curry._3(disposeCurrentGameObject, /* tuple */[
                                      store,
                                      dispatch
                                    ], /* () */0, /* () */0);
                        })
                    }, DomHelper$WonderEditor.textEl("dispose"))));
}

function buildOperateExtensionComponent() {
  return React.createElement("div", {
              className: "component-item"
            }, ReasonReact.element(/* None */0, /* None */0, FileInput$WonderEditor.make(/* Some */["show Input"], /* Some */[(function (value) {
                          return AppExtensionView$WonderEditor.setExtension("userExtension", value);
                        })], /* array */[])));
}

var Method = /* module */[
  /* getStorageParentKey */getStorageParentKey,
  /* addExtension */addExtension,
  /* addBox */addBox,
  /* disposeCurrentGameObject */disposeCurrentGameObject,
  /* buildOperateHistoryComponent */buildOperateHistoryComponent,
  /* buildOperateGameObjectComponent */buildOperateGameObjectComponent,
  /* buildOperateExtensionComponent */buildOperateExtensionComponent
];

var component = ReasonReact.statelessComponent("Header");

function render(store, dispatch, _) {
  return React.createElement("article", {
              key: "header",
              className: "header-component"
            }, buildOperateHistoryComponent(store, dispatch), buildOperateGameObjectComponent(store, dispatch), buildOperateExtensionComponent(/* () */0));
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, self);
    });
  return newrecord;
}

export {
  Method    ,
  component ,
  render    ,
  make      ,
  
}
/*  Not a pure module */
