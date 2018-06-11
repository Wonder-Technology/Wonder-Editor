

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../../external/Css.js";
import * as Switch$WonderEditor from "../../../atom_component/switch/Switch.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as FileInput$WonderEditor from "../../../atom_component/fileInput/FileInput.js";
import * as HeaderUtils$WonderEditor from "../utils/HeaderUtils.js";
import * as ControllerUtils$WonderEditor from "../../../utils/controller/ControllerUtils.js";
import * as AllHistoryService$WonderEditor from "../../../../service/stateTuple/history/AllHistoryService.js";
import * as AppExtensionUtils$WonderEditor from "../../../utils/extension/AppExtensionUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../service/state/editor/SceneEditorService.js";
import * as StateHistoryService$WonderEditor from "../../../../service/stateTuple/history/StateHistoryService.js";
import * as HeaderAddGameObjectEventHandler$WonderEditor from "./eventHandler/HeaderAddGameObjectEventHandler.js";
import * as HeaderDisposeGameObjectEventHandler$WonderEditor from "./eventHandler/HeaderDisposeGameObjectEventHandler.js";

Css$WonderEditor.importCss("./css/header.css");

function getStorageParentKey() {
  return "userExtension";
}

function addExtension(text) {
  return AppExtensionUtils$WonderEditor.setExtension("userExtension", text);
}

var addBox = HeaderAddGameObjectEventHandler$WonderEditor.MakeEventHandler[/* onClick */2];

var disposeCurrentSceneTreeNode = HeaderDisposeGameObjectEventHandler$WonderEditor.MakeEventHandler[/* onClick */2];

function buildOperateHistoryComponent(store, dispatchFunc) {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return StateHistoryService$WonderEditor.getAndRefreshStateForHistory((function (param) {
                                        return AllHistoryService$WonderEditor.undoHistoryState(store, dispatchFunc, param);
                                      }));
                        })
                    }, DomHelper$WonderEditor.textEl("undo"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return StateHistoryService$WonderEditor.getAndRefreshStateForHistory((function (param) {
                                        return AllHistoryService$WonderEditor.redoHistoryState(store, dispatchFunc, param);
                                      }));
                        })
                    }, DomHelper$WonderEditor.textEl("redo"))));
}

function buildOperateGameObjectComponent(store, dispatchFunc) {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      onClick: (function () {
                          return Curry._3(addBox, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], "box", /* () */0);
                        })
                    }, DomHelper$WonderEditor.textEl("add box"))), React.createElement("div", {
                  className: "component-item"
                }, React.createElement("button", {
                      disabled: HeaderUtils$WonderEditor.isGameObjectNotRemoveable(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode)),
                      onClick: (function () {
                          return Curry._3(disposeCurrentSceneTreeNode, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], /* () */0, /* () */0);
                        })
                    }, DomHelper$WonderEditor.textEl("dispose"))));
}

function buildOperateExtensionComponent() {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, ReasonReact.element(/* None */0, /* None */0, FileInput$WonderEditor.make(/* Some */["show Input"], /* Some */[(function (value) {
                              return AppExtensionUtils$WonderEditor.setExtension("userExtension", value);
                            })], /* array */[]))));
}

function buildOperateControllerComponent(store, dispatchFunc) {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, ReasonReact.element(/* None */0, /* None */0, Switch$WonderEditor.make("run", (function (param) {
                            return ControllerUtils$WonderEditor.run(store, param);
                          }), "stop", (function (param) {
                            return ControllerUtils$WonderEditor.stop(dispatchFunc, param);
                          }), StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getIsRun), /* array */[]))));
}

var Method = /* module */[
  /* getStorageParentKey */getStorageParentKey,
  /* addExtension */addExtension,
  /* addBox */addBox,
  /* disposeCurrentSceneTreeNode */disposeCurrentSceneTreeNode,
  /* buildOperateHistoryComponent */buildOperateHistoryComponent,
  /* buildOperateGameObjectComponent */buildOperateGameObjectComponent,
  /* buildOperateExtensionComponent */buildOperateExtensionComponent,
  /* buildOperateControllerComponent */buildOperateControllerComponent
];

var component = ReasonReact.statelessComponent("Header");

function render(store, dispatchFunc, _) {
  return React.createElement("article", {
              key: "header",
              className: "wonder-header-component"
            }, buildOperateHistoryComponent(store, dispatchFunc), buildOperateGameObjectComponent(store, dispatchFunc), buildOperateExtensionComponent(/* () */0), buildOperateControllerComponent(store, dispatchFunc));
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
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(store, dispatchFunc, self);
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
/*  Not a pure module */
